import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Expense } from './ExpenseModel';
import { User } from './UserModel';

@Entity('statements')
export class Statement {
  @PrimaryGeneratedColumn({
    name: 'id_statement',
    primaryKeyConstraintName: 'pk_id_statement',
  })
  id: number;
  @ManyToOne(() => Expense, (expense) => expense.statement)
  @JoinColumn({ name: 'expense_id', foreignKeyConstraintName: 'fk_statement_expense' })
  expense: Expense;
  @Column({ name: 'target_value' })
  targetValue: number;
  @Column({ name: 'target_date' })
  targetDate: Date;
  @Column({ name: 'end_value' })
  endValue: number;
  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'created_at', default: Timestamp })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createUserStatement)
  @JoinColumn({ name: 'created_by_user_id', foreignKeyConstraintName: 'fk_statement_created_by' })
  createdUser: User;
}
