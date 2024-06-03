import { Db } from 'mongodb';
import { User } from './user.model';

export class UserService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async getAllUsers(): Promise<User[]> {
        console.log('Fetching all users');
        const users = await this.db.collection('users').find().toArray();
        console.log('Fetched users: ', users);
        return users as User[];
    }

    public async getUser(userId: string): Promise<User | null> {
        console.log('Fetching user with userId: ', userId);
        const user = await this.db.collection('users').findOne({ userId });
        console.log('Fetched user: ', user);
        return user as User | null;
    }

    public async saveUser(user: User): Promise<void> {
        console.log('Saving user: ', user);
        const {_id, ...userWithoutId} = user;
        await this.db.collection('users').updateOne(
            { userId: user.userId },
            { $set: userWithoutId },
            { upsert: true }
        );
        console.log('User saved');
    }

    public async saveHistory(userId: string, history: { url: string, timestamp: Date, title: string }): Promise<void> {
        console.log('Saving history for user: ', userId);
        await this.db.collection('users').updateOne(
            { userId },
            { $push: { browsingHistory: history } as any},
            { upsert: true }
        );
        console.log('History saved');
    }
}