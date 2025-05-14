import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Web3ConfigService } from './config/web3.config';
import { ConfigModule } from '@nestjs/config';
import { SwapModule } from './swap/swap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SwapModule
  ],
  controllers: [AppController],
  providers: [AppService, Web3ConfigService],
  exports: [Web3ConfigService],
})
export class AppModule { }
