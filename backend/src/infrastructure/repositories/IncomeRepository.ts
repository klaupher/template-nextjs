import { Income } from '../../core/entities/IncomeModel';
import { AppDataSource } from '../../data-source';

export const IncomeRepository = AppDataSource.getRepository(Income);
