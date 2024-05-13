import React, { useEffect, useState } from 'react';
import { getUsers, gethistory, addhistory } from '../utils/api';

const ItemsList = () => {
    const [users, setUsers] = useState([]);
    const [history, setHistory] = useState([]);
    const [username, setUsername] = useState('testUser');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyData = await gethistory(username);
                setHistory(historyData.history);
            } catch (error) {
                console.error('failed to fetch history', error);
            }
        };

        fetchHistory();
    }, [username]);

    // TODO: this funciton makes no sense
    const handleAddHistory = async () => {
        try {
            const newHistory = ['new entry'];
            await addhistory(username, newHistory);
            setHistory(prevHistory => [...prevHistory, ...newHistory]);
        } catch (error) {
            console.error('failed to add history', error);
        }
    };

    return (
        <div>
            <h1>Users List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <h1>User History</h1>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>{entry}</li>
                ))}
            </ul>
            <button onClick={handleAddHistory}>Add History</button>
        </div>
    );
};

export default ItemsList;