import { User } from '../../core/entities/UserModel';
import { AppDataSource } from '../../data-source';

export const UserRepository = AppDataSource.getRepository(User);
