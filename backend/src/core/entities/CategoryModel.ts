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

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id_category', primaryKeyConstraintName: 'pk_id_category' })
  id!: number;

  @Column({ type: 'text' })
  alias!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ name: 'created_at', default: Timestamp })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.createUserCategory)
  @JoinColumn({ name: 'created_by_user_id', foreignKeyConstraintName: 'fk_user_created_by' })
  createdUser: number;

  @OneToMany(() => Expense, (expense) => expense.category)
  expense: Expense[];
}
