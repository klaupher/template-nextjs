import { Expense } from '../../core/entities/ExpenseModel';
import { AppDataSource } from '../../data-source';

export const ExpenseRepository = AppDataSource.getRepository(Expense);
