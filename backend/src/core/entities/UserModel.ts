import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Category } from './CategoryModel';
import { Expense } from './ExpenseModel';
import { Statement } from './StatementModel';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    name: 'id_user',
    primaryKeyConstraintName: 'pk_id_user',
  })
  id: number;
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text', unique: true })
  email: string;
  @Column({ type: 'text' })
  password: string;
  @Column({ name: 'created_at', default: Timestamp })
  createdAt: Date;
  createdUser: number;

  @OneToMany(() => Category, (category) => category.createdUser)
  createUserCategory: Category;
  @OneToMany(() => Expense, (expense) => expense.createdUser)
  createUserExpense: Expense;
  @OneToMany(() => Statement, (statement) => statement.createdUser)
  createUserStatement: Statement;
}
