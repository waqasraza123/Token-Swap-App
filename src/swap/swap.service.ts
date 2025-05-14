import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { Web3ConfigService } from '../config/web3.config';
import { ERC20_ABI } from './erc20.abi';
import { CustomJsonResponse } from 'src/types/CustomJsonResponse';

@Injectable()
export class SwapService {
    constructor(private readonly web3: Web3ConfigService) { }

    async getTokenBalance(tokenAddress: string, userAddress: string): Promise<CustomJsonResponse<string>> {
        try {
            const provider = this.web3.getProvider();

            const code = await provider.getCode(tokenAddress);
            if (code === '0x') {
                return {
                    status: 'failed',
                    message: 'No contract found at the given token address.',
                    error: { tokenAddress },
                };
            }

            const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
            const balance = await contract.balanceOf(userAddress);
            const decimals = await contract.decimals();
            const formattedBalance = ethers.formatUnits(balance, decimals);

            return {
                status: 'success',
                message: 'Token balance fetched successfully.',
                data: formattedBalance,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: 'Failed to fetch token balance.',
                error,
            };
        }
    }

    async swapTokens(
        fromToken: string,
        toToken: string,
        amount: string,
        userAddress: string
    ): Promise<CustomJsonResponse<string>> {
        try {
            const provider = this.web3.getProvider();
            const wallet = this.web3.getWallet();

            const fromTokenContract = new ethers.Contract(fromToken, ERC20_ABI, wallet);
            const toTokenContract = new ethers.Contract(toToken, ERC20_ABI, wallet);

            const decimals = await fromTokenContract.decimals();
            const parsedAmount = ethers.parseUnits(amount, decimals);

            const fromCode = await provider.getCode(fromToken);
            const toCode = await provider.getCode(toToken);
            if (fromCode === '0x' || toCode === '0x') {
                return {
                    status: 'failed',
                    message: 'One of the token addresses is not a deployed contract.',
                    error: { fromToken, toToken },
                };
            }

            const approveTx = await fromTokenContract.approve(toToken, parsedAmount);
            await approveTx.wait();

            const transferTx = await fromTokenContract.transfer(toToken, parsedAmount);
            const receipt = await transferTx.wait();

            return {
                status: 'success',
                message: 'Token swap transaction sent successfully.',
                data: receipt.transactionHash,
            };
        } catch (error) {
            console.log(error); //TODO delete this
            return {
                status: 'failed',
                message: 'Token swap failed.',
                error,
            };
        }
    }
}
