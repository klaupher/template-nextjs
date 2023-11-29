import { Request, Response } from 'express';
import { Expense } from '../../core/entities/ExpenseModel';
import { ExpenseService } from '../../services/ExpenseService';

export class ExpenseController {
  async create(req: Request, res: Response) {
    const reqExpense: Expense = req.body;
    if (!reqExpense.fullname) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    try {
      const newExpense = await ExpenseService.create(reqExpense);
      return res.status(200).json({ message: 'success', expense: newExpense });      
    } catch (error) {
      return res.status(500).json({ message: 'fail', error: error }); 
    }
  }

  async update(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da despesa inválido' });
    }
    const idExpense: number = Number.parseInt(req.params.id);
    const reqExpense: Expense = req.body;
    if (!reqExpense.fullname) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    const upExpense = await ExpenseService.update(idExpense, reqExpense);
    return res.status(200).json({ message: 'success', expense: upExpense });
  }

  async delete(req: Request, res: Response) {    
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da despesa inválido' });
    }
    const idExpense: number = Number.parseInt(req.params.id);
    await ExpenseService.delete(idExpense);
    return res.status(200).json({ message: 'success'});
  }
  
  async list(req: Request, res: Response) {
    return res.status(200).json({ message: 'success', expenses: await ExpenseService.list() });
  } 
  
  async getById(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da despesa inválido' });
    }
    const idCategory: number = Number.parseInt(req.params.id);
    return res.status(200).json({ message: 'success', category: await ExpenseService.getById(idCategory) });
  }
}
