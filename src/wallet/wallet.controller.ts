import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async createWallet(@Body('username') username: string) {
    if (!username) {
      throw new BadRequestException('Username is required');
    }
    return this.walletService.createWallet(username);
  }

  @Get('balance/:address')
  async getBalance(@Param('address') address: string) {
    const balance = await this.walletService.getBalance(address);
    if (!balance) {
      throw new NotFoundException('Wallet not found');
    }
    return balance;
  }
}
