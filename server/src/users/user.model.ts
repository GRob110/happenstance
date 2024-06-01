import { ObjectId } from "mongodb";

export interface User {
    _id: ObjectId;
    userId: string;
    name: string;
    email: string;
    friends: string[];
    browsingHistory: { url: string; timestamp: Date }[];
}