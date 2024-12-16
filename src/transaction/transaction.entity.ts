import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.sentTransactions, { eager: true })
  @JoinColumn({ name: 'senderId' })
  sender: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.receivedTransactions, {
    eager: true,
  })
  @JoinColumn({ name: 'recipientId' })
  recipient: Wallet;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
