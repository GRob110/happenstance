import { Router } from 'express';
import { UserController } from './user.controller';
import { connectToDb } from '../db';
import { UserService } from './user.service';

const userRouter = Router();

connectToDb().then((db) => {
    const userService = new UserService(db);
    const userController = new UserController(userService);

    userRouter.get('/', (req, res) => userController.getAllUsers(req, res));
    userRouter.get('/:userId', (req, res) => userController.getUser(req, res));
    userRouter.put('/:userId', (req, res) => userController.saveUser(req, res));
    userRouter.post('/:userId/history', (req, res) => userController.saveHistory(req, res));
});

export default userRouter;