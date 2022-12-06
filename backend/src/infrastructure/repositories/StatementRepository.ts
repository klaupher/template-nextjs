import { Statement } from '../../core/entities/StatementModel';
import { AppDataSource } from '../../data-source';

export const StatementRepository = AppDataSource.getRepository(Statement);
