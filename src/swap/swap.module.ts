import { Module } from '@nestjs/common';
import { SwapService } from './swap.service';
import { Web3ConfigService } from '../config/web3.config';
import { SwapController } from './swap.controller';

@Module({
    controllers: [SwapController],
    providers: [SwapService, Web3ConfigService],
})
export class SwapModule { }
