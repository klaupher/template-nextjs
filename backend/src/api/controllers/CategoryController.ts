import { Request, Response } from 'express';
import { Category } from '../../core/entities/CategoryModel';
import { CategoryService } from '../../services/CategoryService';

export class CategoryController {
  async create(req: Request, res: Response) {
    const reqCategory: Category = req.body;
    if (!reqCategory.alias || !reqCategory.description) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    const newCategory = await CategoryService.create(reqCategory);
    return res.status(200).json({ message: 'success', category: newCategory });
  }

  async update(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da categoria inválido' });
    }
    const idCategory: number = Number.parseInt(req.params.id);
    const reqCategory: Category = req.body;
    if (!reqCategory.alias || !reqCategory.description) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    const upCategory = await CategoryService.update(idCategory, reqCategory);
    return res.status(200).json({ message: 'success', category: upCategory });
  }

  async delete(req: Request, res: Response) {    
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da categoria inválido' });
    }
    const idCategory: number = Number.parseInt(req.params.id);
    await CategoryService.delete(idCategory);
    return res.status(200).json({ message: 'success'});
  }
  
  async list(req: Request, res: Response) {
    return res.status(200).json({ message: 'success', categories: await CategoryService.list() });
  }
  
  async getById(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da categoria inválido' });
    }
    const idCategory: number = Number.parseInt(req.params.id);
    return res.status(200).json({ message: 'success', category: await CategoryService.getById(idCategory) });
  }
}
