import { Controller, Get, Query } from '@nestjs/common';
import { SwapService } from './swap.service';
import { CustomJsonResponse } from 'src/types/CustomJsonResponse';

@Controller('swap')
export class SwapController {
    constructor(private readonly swapService: SwapService) { }

    @Get('balance')
    async getBalance(
        @Query('token') token: string,
        @Query('user') user: string,
    ) {
        return {
            token,
            user,
            balance: await this.swapService.getTokenBalance(token, user),
        };
    }

    @Get('tokens')
    async swapTokens(
        @Query('fromToken') fromToken: string,
        @Query('toToken') toToken: string,
        @Query('amount') amount: string,
        @Query('user') user: string,
    ): Promise<CustomJsonResponse<string>> {
        const tx = await this.swapService.swapTokens(fromToken, toToken, amount, user);
        return tx;
    }
}
