import { Request, Response } from 'express';
import { Category } from '../../core/entities/CategoryModel';
import { CategoryService } from '../../services/CategoryService';

export class CategoryController {
  async create(req: Request, res: Response) {
    const reqCategory: Category = req.body;
    if (reqCategory.alias === null) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    const newCategory = await CategoryService.create(reqCategory);
    return res.status(200).json({ message: 'success', category: newCategory });
  }
}
