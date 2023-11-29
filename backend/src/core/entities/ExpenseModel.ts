import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Category } from './CategoryModel';
import { Statement } from './StatementModel';
import { User } from './UserModel';
import { TypeExpense, DayOfWeek, MonthOfYear } from '../constants/enums';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn({ name: 'id_expense', primaryKeyConstraintName: 'pk_id_expense' })
  id: number;

  @Column({ type: 'text' })
  fullname: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  weekly: boolean;

  @Column({ type: 'boolean', default: false })
  monthly: boolean;

  @Column({ type: 'boolean', default: false })
  yearly: boolean;

  @Column({ type: 'integer', nullable: true })
  dueDay: number;

  @Column({ type: 'integer', nullable: true })
  dueMonth: MonthOfYear;

  @Column({ type: 'integer', nullable: true })
  dueWeek: DayOfWeek;

  @Column({ type: 'integer', default: 1})
  typeExpense: TypeExpense

  @ManyToOne(() => Category, (category: Category) => category.expense)
  @JoinColumn({ name: 'category_id', foreignKeyConstraintName: 'fk_expense_category' })
  category: Category;

  @Column({ name: 'created_at', default: Timestamp })
  createdAt: Date;

  @ManyToOne(() => User, (user: User) => user.createUserExpense)
  @JoinColumn({ name: 'created_by_user_id', foreignKeyConstraintName: 'fk_expense_created_by' })
  createdUser: User;

  @OneToMany(() => Statement, (statement: Statement) => statement.expense)
  statement: Statement[];
}
