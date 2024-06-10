import { Db } from 'mongodb';
import { User } from './user.model';

export class UserService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async getAllUsers(): Promise<User[]> {
        const users = await this.db.collection('users').find().toArray();
        return users as User[];
    }

    public async getUser(userId: string): Promise<User | null> {
        const user = await this.db.collection('users').findOne({ userId });
        return user as User | null;
    }

    public async saveUser(user: User): Promise<void> {
        const {_id, ...userWithoutId} = user;
        await this.db.collection('users').updateOne(
            { userId: user.userId },
            { $set: userWithoutId },
            { upsert: true }
        );
    }

    public async saveHistory(userId: string, history: { url: string, timestamp: Date, title: string }): Promise<void> {
        console.log('Saving history for user: ', userId);
        await this.db.collection('users').updateOne(
            { userId },
            { $push: { history: history } as any},
            { upsert: true }
        );
        console.log('History saved');
    }
}