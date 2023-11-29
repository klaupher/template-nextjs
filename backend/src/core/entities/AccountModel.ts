import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Expense } from './ExpenseModel';
import { User } from './UserModel';
import { Statement } from './StatementModel';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn({ name: 'id_account', primaryKeyConstraintName: 'pk_id_account' })
  id!: number;

  @Column({ type: 'text' })
  name: string;

  @Column({type: 'numeric', precision: 10, scale: 2, nullable: true})
  balance: number;

  @Column({ name: 'created_at', default: Timestamp })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.createUserCategory)
  @JoinColumn({ name: 'created_by_user_id', foreignKeyConstraintName: 'fk_user_created_by_account' })
  createdUser: number;

  @OneToMany(() => Statement, state => state.account)
  statement: Statement;
}
