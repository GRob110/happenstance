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
            console.log('Users found: ', users);
            res.json(users);
        } catch (error) {
            console.error('Error getting users: ', error);
            res.status(500).send('Error getting users');
        }
    }
    
    public getUser = async (req: Request, res: Response): Promise<void> => {
        const userId = req.params.userId;
        console.log('Received request for user with userId: ', userId);
        try {
            const user = await this.userService.getUser(userId);
            if (user) {
                console.log('User found: ', user);
                res.json(user);
            } else {
                console.log('User not found');
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Error getting user: ', error);
            res.status(500).send('Error getting user');
        }
    }

    public async saveUser(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        console.log('Received request to save user: ', user);
        try {
            await this.userService.saveUser(user);
            console.log('User saved');
            res.status(200).json({ message: 'User saved' });
        } catch (error) {
            console.error('Error saving user: ', error);
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