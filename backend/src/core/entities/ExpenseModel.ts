import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Category } from './CategoryModel';
import { Statement } from './StatementModel';
import { User } from './UserModel';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn({ name: 'id_expense', primaryKeyConstraintName: 'pk_id_expense' })
  id: number;
  @Column({ type: 'text' })
  fullname: string;
  @Column({ type: 'text' })
  description: string;
  @Column()
  weekly: boolean;
  @Column()
  monthly: boolean;
  @Column()
  yearly: boolean;

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
