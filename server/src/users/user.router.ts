import { Router } from 'express';
import { UserController } from './user.controller';
import { connectToDb } from '../db';
import { UserService } from './user.service';

const userRouter = Router();

connectToDb().then((db) => {
    const userService = new UserService(db);
    const userController = new UserController(userService);

    userRouter.get('/:userId', (req, res) => userController.getUser(req, res));
    userRouter.post('/', (req, res) => userController.saveUser(req, res));
});

export default userRouter;