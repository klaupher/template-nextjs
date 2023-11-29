import { BadRequestError, UnauthorizedError } from '../core/helpers/api-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../infrastructure/repositories/UserRepository';

type JwtPayload = {
  id: number;
  name: string;
};

export class UserService {
  static async getProfile(authorization: string) {
    const token = authorization.split(' ')[1];
    const { id, name } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
    const user = await UserRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedError('Não autorizado.');
    }
    const { password: _, ...userLogin } = user;
    return userLogin;
  }

  static async login(email: any, password: any) {
    const user = await UserRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestError('Email/senha inexistente.');
    }
    const verifyPass = await bcrypt.compare(password, user.password);
    if (!verifyPass) {
      throw new BadRequestError('Email/senha inexistente.');
    }
    try {
      const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_PASS ?? '', { expiresIn: '1h' });      
      const { password: _, ...userLogin } = user;
      return { userLogin, token };
    } catch (error) {
      throw new BadRequestError(`Error - ${error}`);
    }
  }

  static async create(name: string, email: string, password: string) {
    const userExist = await UserRepository.findOneBy({ email });
    if (userExist) {
      throw new BadRequestError('Email já existente.');
    }
    const hashPassword = await bcrypt.hash(password, 9);
    const newUser = UserRepository.create({
      name,
      email,
      password: hashPassword,
      createdAt: new Date(),
    });
    console.log('newUser ', newUser);
    await UserRepository.save(newUser);
    const { password: _, ...user } = newUser;
    return user;
  }

  static async getById(id: number){
    return  await UserRepository.findOneBy({ id });
  }
  
  static async list(){
    const users = await UserRepository.find()
    const listUsers = users.map((user) => ({...user, password:"_"}))
    return  listUsers;
  }
}
