import { Request, Response } from 'express';

export class CategoryController {
  async create(req: Request, res: Response) {
    return res.status(200).json({ message: 'Entrei na Category Controller' });
  }
}
