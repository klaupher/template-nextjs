import { User } from '../entities/UserModel';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<User>;
    }
  }
}
