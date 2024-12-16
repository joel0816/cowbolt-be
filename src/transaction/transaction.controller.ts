import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('send')
  async send(
    @Body()
    {
      sender,
      recipient,
      amount,
    }: {
      sender: string;
      recipient: string;
      amount: number;
    },
  ) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }
    return this.transactionService.send(sender, recipient, amount);
  }

  @Get('history/:address')
  async getHistory(@Param('address') address: string) {
    const history =
      await this.transactionService.getTransactionHistory(address);

    if (!history.length) {
      throw new NotFoundException('No transactions found for this address');
    }

    return history;
  }
}
