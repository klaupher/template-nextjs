import { Request, Response } from 'express';
import { Income } from '../../core/entities/IncomeModel';
import { IncomeService } from '../../services/IncomeService';

export class IncomeController {
  async create(req: Request, res: Response) {
    const reqIncome: Income = req.body;
    if (!reqIncome.fullname) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    const newIncome = await IncomeService.create(reqIncome);
    return res.status(200).json({ message: 'success', income: newIncome });
  }

  async update(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da categoria inválido' });
    }
    const idIncome: number = Number.parseInt(req.params.id);
    const reqIncome: Income = req.body;
    if (!reqIncome.fullname) {
      return res.status(400).json({ message: 'Dados inválidos. Verifique!' });
    }
    const upIncome = await IncomeService.update(idIncome, reqIncome);
    return res.status(200).json({ message: 'success', income: upIncome });
  }

  async delete(req: Request, res: Response) {    
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da ganhos inválido' });
    }
    const idIncome: number = Number.parseInt(req.params.id);
    await IncomeService.delete(idIncome);
    return res.status(200).json({ message: 'success'});
  }
  
  async list(req: Request, res: Response) {
    return res.status(200).json({ message: 'success', incomes: await IncomeService.list() });
  }
  
  async getById(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da ganhos inválido' });
    }
    const idIncome: number = Number.parseInt(req.params.id);
    return res.status(200).json({ message: 'success', category: await IncomeService.getById(idIncome) });
  }
}
