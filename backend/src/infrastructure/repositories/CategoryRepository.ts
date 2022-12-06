import { Category } from '../../core/entities/CategoryModel';
import { AppDataSource } from '../../data-source';

export const CategoryRepository = AppDataSource.getRepository(Category);
