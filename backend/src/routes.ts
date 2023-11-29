import { Request, Response, Router } from 'express';
import { CategoryController } from './api/controllers/CategoryController';
import { UserController } from './api/controllers/UserController';
import { authMiddleware } from './core/middlewares/auth';
import { ExpenseController } from './api/controllers/ExpenseController';
import { IncomeController } from './api/controllers/IncomeController';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('Hello world with Typescript');
}); 

routes.post('/user', new UserController().create);
routes.post('/login', new UserController().login);

routes.use(authMiddleware);
//Routes - User
routes.get('/profile', new UserController().getProfile);
routes.get('/user/:id', new UserController().getById);
routes.get('/user', new UserController().list);

//Routes - Category
routes.get('/category', new CategoryController().list);
routes.get('/category/:id', new CategoryController().getById);
routes.post('/category', new CategoryController().create);
routes.put('/category/:id', new CategoryController().update);
routes.delete('/category/:id', new CategoryController().delete);

//Routes - Expenses
routes.get('/expense', new ExpenseController().list);
routes.get('/expense/:id', new ExpenseController().getById);
routes.post('/expense', new ExpenseController().create);
routes.put('/expense/:id', new ExpenseController().update);
routes.delete('/expense/:id', new ExpenseController().delete);

//Routes - Income
routes.get('/income', new IncomeController().list);
routes.get('/income/:id', new IncomeController().getById);
routes.post('/income', new IncomeController().create);
routes.put('/income/:id', new IncomeController().update);
routes.delete('/income/:id', new IncomeController().delete);

export default routes;
