import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Wallet } from '../wallet/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Wallet])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
