import { Request, Response } from 'express';
import { UnauthorizedError } from '../../core/helpers/api-errors';
import { UserService } from '../../services/UserService';
import jwt from 'jsonwebtoken';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const newUser = await UserService.create(name, email, password);
    return res.status(200).json(newUser);
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    return res.status(200).json(token);
  }
  async getProfile(req: Request, res: Response) {
    const { user } = req;
    return res.status(200).json(user);
  }
  
  async getById(req: Request, res: Response) {
    if (isNaN(parseInt(req.params.id))){
      return res.status(400).json({ message: 'Identificador da usuário inválido' });
    }
    const idUser: number = Number.parseInt(req.params.id);
    return res.status(200).json({ message: 'success', user: await UserService.getById(idUser) });
  }

  
  async list(req: Request, res: Response) {
    return res.status(200).json({ message: 'success', users: await UserService.list()});
  }
} 
