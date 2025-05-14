import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class Web3ConfigService {
    private readonly provider: ethers.JsonRpcProvider;
    private readonly wallet: ethers.Wallet;

    constructor(private readonly configService: ConfigService) {
        const rpcUrl = this.configService.get<string>('RPC_URL');
        const privateKey = this.configService.get<string>('METAMASK_PRIVATE_KEY');

        if (!rpcUrl || !privateKey) {
            throw new Error('RPC_URL or METAMASK_PRIVATE_KEY is not defined in the .env file');
        }

        this.provider = new ethers.JsonRpcProvider(rpcUrl);;
        this.wallet = new ethers.Wallet(privateKey, this.provider);
    }

    getProvider(): ethers.JsonRpcProvider {
        return this.provider;
    }

    getWallet(): ethers.Wallet {
        return this.wallet;
    }
}
