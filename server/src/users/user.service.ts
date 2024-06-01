import { Db } from 'mongodb';
import { User } from './user.model';

export class UserService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async getUser(userId: string): Promise<User | null> {
        console.log('Fetching user with userId: ', userId);
        const user = await this.db.collection('users').findOne({ userId });
        console.log('Fetched user: ', user);
        return user as User | null;
    }

    public async saveUser(user: User): Promise<void> {
        console.log('Saving user: ', user);
        await this.db.collection('users').updateOne(
            { userId: user.userId },
            { $set: user },
            { upsert: true }
        );
        console.log('User saved');
    }
}