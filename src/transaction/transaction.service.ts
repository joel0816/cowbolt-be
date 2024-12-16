import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async send(senderAddress: string, recipientAddress: string, amount: number) {
    if (!senderAddress || !recipientAddress) {
      throw new BadRequestException(
        'Sender and recipient addresses must be provided',
      );
    }

    const sender = await this.walletRepository.findOne({
      where: { address: senderAddress },
    });
    const recipient = await this.walletRepository.findOne({
      where: { address: recipientAddress },
    });

    if (!sender) throw new NotFoundException('Sender wallet not found');
    if (!recipient) throw new NotFoundException('Recipient wallet not found');
    if (sender.balance < amount)
      throw new BadRequestException('Insufficient balance');

    await this.walletRepository.manager.transaction(async (manager) => {
      sender.balance -= amount;
      recipient.balance += amount;
      await manager.save(sender);
      await manager.save(recipient);

      const transaction = this.transactionRepository.create({
        sender,
        recipient,
        amount,
      });

      return manager.save(transaction);
    });
  }

  async getTransactionHistory(address: string) {
    return this.transactionRepository.find({
      where: [{ sender: { address } }, { recipient: { address } }],
      relations: ['sender', 'recipient'],
    });
  }
}
