import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-errors';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

type JwtPayload = {
  id: number;
  name: string;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }
  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_PASS ?? '', async (err, decoded) => {
    if (err) {
      throw new UnauthorizedError('Não autorizado.');
    }
    const { id, name } = decoded as Partial<JwtPayload>;
    if (!id) {
      throw new UnauthorizedError('Não autorizado.');
    }
    const user = await UserRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedError('Não autorizado.');
    }
    const { password: _, ...loggedUser } = user;
    req.user = loggedUser;
  });
  next();
};
