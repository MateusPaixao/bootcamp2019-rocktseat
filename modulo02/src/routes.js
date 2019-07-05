import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleaware from './app/middlewares/auth';

const routes = new Router();
const upldoad = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleaware);
routes.put('/users', UserController.update);

routes.post('/files', upldoad.single('file'), FileController.store);

export default routes;
