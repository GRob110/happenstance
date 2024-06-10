import { Request, Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.model';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        console.log('Received request for all users');
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).send('Error getting users');
        }
    }
    
    public getUser = async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.userId;
        try {
            const user = await this.userService.getUser(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send('Error getting user');
        }
    }

    public async saveUser(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        try {
            await this.userService.saveUser(user);
            res.status(200).json({ message: 'User saved' });
        } catch (error) {
            res.status(500).send('Error saving user');
        }
    }

    public async saveHistory(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        const { url, timestamp, title } = req.body.history;
        console.log('Received request to save history by user: ', userId);
        try {
            await this.userService.saveHistory(userId, {url, timestamp, title});
            console.log('History saved');
            res.status(200).json({ message: 'History saved' });
        } catch (error) {
            console.error('Error saving history: ', error);
            res.status(500).send('Error saving history');
        }
    }
}