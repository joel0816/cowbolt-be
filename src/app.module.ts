import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { DatabaseModule } from './database/database.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [WalletModule, DatabaseModule, TransactionModule],
})
export class AppModule {}
