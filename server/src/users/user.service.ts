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
        
        // Retrieve browsing history for user
        const user = await this.db.collection('users').findOne({ userId }, { projection: { history: { $slice: -10 } } });
        const lastHistoryItem = user?.history?.[0];

        // Check if the history item is the same as the last one
        if (lastHistoryItem && lastHistoryItem.url === history.url) {
            console.log('History item is the same as the last one, skipping...');
            return;
        }

        await this.db.collection('users').updateOne(
            { userId },
            { 
                $push: { 
                    history: {
                        $each: [history],
                        $slice: -10 // keep only the last 10 items
                    }
                } as any
            },
            { upsert: true }
        );
    }

    public async saveActiveTab(userId: string, activeTab: { url: string, timestamp: Date, title: string }): Promise<void> {
        console.log('Saving active tab for user: ', userId);

        await this.db.collection('users').updateOne(
            { userId },
            { $set: { activeTab } },
            { upsert: true }
        );
    }

    public async getActiveTabs(userId: string): Promise<any[]> {
        const user = await this.db.collection('users').findOne({ userId });
        if (!user) {
            return [];
        }
        const friendsIds = user.friends;
        const users = await this.db.collection('users').find({
            userId: { $in: [...friendsIds, userId] }
        }, {
            projection: { activeTab: 1, name: 1 }
        }).toArray();
        return users.map(u => ({
            name: u.name,
            activeTab: u.activeTab
        }));
    }
}