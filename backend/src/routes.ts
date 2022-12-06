import { Request, Response, Router } from 'express';
import { CategoryController } from './api/controllers/CategoryController';
import { UserController } from './api/controllers/UserController';
import { authMiddleware } from './core/middlewares/auth';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello world with Typescript');
});

routes.post('/user', new UserController().create);
routes.post('/login', new UserController().login);

routes.use(authMiddleware);
//Routes - User
routes.get('/profile', new UserController().getProfile);

//Routes - Category
routes.post('/category', new CategoryController().create);

export default routes;
