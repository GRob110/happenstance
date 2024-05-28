import { Request, Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.model';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public getUser = async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.userId;
        const user = await this.userService.getUser(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

    public async saveUser(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        await this.userService.saveUser(user);
        res.status(200).json({ message: 'User saved' });
    }
}