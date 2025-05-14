import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { Web3ConfigService } from '../config/web3.config';
import { ERC20_ABI } from './erc20.abi';
import { CustomJsonResponse } from 'src/types/CustomJsonResponse';
import { UNISWAP_ROUTER_ABI, UNISWAP_ROUTER_ADDRESS } from 'src/config/uniswap.config';

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

            const decimals = await fromTokenContract.decimals();
            const parsedAmount = ethers.parseUnits(amount, decimals);

            const approvalTx = await fromTokenContract.approve(UNISWAP_ROUTER_ADDRESS, parsedAmount);
            await approvalTx.wait();

            const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, wallet);

            const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

            const tx = await router.swapExactTokensForTokens(
                parsedAmount,
                0,
                [fromToken, toToken],
                userAddress,
                deadline
            );

            const receipt = await tx.wait();

            return {
                status: 'success',
                message: 'Swap executed via Uniswap successfully.',
                data: receipt.transactionHash,
            };
        } catch (error) {
            return {
                status: 'failed',
                message: 'Token swap via Uniswap failed.',
                error,
            };
        }
    }

}
