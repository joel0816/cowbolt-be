import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async createWallet(username: string) {
    const address = randomUUID();
    const wallet = this.walletRepository.create({ username, address });
    return this.walletRepository.save(wallet);
  }

  async getBalance(address: string) {
    const wallet = await this.walletRepository.findOne({ where: { address } });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return { balance: wallet.balance };
  }
}
