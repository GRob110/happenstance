import { Db } from 'mongodb';
import { User } from './user.model';

export class UserService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    public async getUser(userId: string): Promise<User | null> {
        return this.db.collection('users').findOne({ userId });
    }

    public async saveUser(user: User): Promise<void> {
        await this.db.collection('users').updateOne(
            { userId: user.userId },
            { $set: user },
            { upsert: true }
        );
    }
}