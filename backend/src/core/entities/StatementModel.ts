import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Expense } from './ExpenseModel';
import { User } from './UserModel';
import { Income } from './IncomeModel';
import { Account } from './AccountModel';

@Entity('statements')
export class Statement {
  @PrimaryGeneratedColumn({
    name: 'id_statement',
    primaryKeyConstraintName: 'pk_id_statement',
  })
  id: number;

  @Column({ name: 'budget_value', type: 'numeric', precision: 10, scale: 2})
  budgetValue: number;

  @Column({ name: 'budget_date', type: 'date'})
  budgetDate: Date;

  @Column({ name: 'real_value', type: 'numeric', precision: 10, scale: 2 })
  realValue: number;

  @Column({ name: 'real_date' })
  realDate: Date;

  @ManyToOne(() => Account, account => account.statement)
  @JoinColumn({ name: 'account_id', foreignKeyConstraintName: 'fk_statement_account'})
  account: Account;

  @ManyToOne(() => Expense, (expense) => expense.statement, {nullable: true})
  @JoinColumn({ name: 'expense_id', foreignKeyConstraintName: 'fk_statement_expense'})
  expense: Expense;  

  @ManyToOne(() => Income, (income) => income.statement, {nullable: true})
  @JoinColumn({ name: 'income_id', foreignKeyConstraintName: 'fk_statement_income' })
  income: Income;

  @Column({ name: 'created_at', default: Timestamp })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createUserStatement)
  @JoinColumn({ name: 'created_by_user_id', foreignKeyConstraintName: 'fk_statement_created_by' })
  createdUser: User;
}
