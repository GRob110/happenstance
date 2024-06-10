import { saveHistory } from "./services/user.service";

chrome.history.onVisited.addListener(async (historyItem) => {
    const url = historyItem.url ?? ""; 
    const lastVisitTime = historyItem.lastVisitTime ?? Date.now();
    const title = historyItem.title ?? "No Title"; 

    console.log('History visited: ', url, lastVisitTime, title);

    try {
        const accessToken = await new Promise<string>((resolve, reject) => {
            chrome.storage.local.get('authToken', (result) => {
                if (typeof result.authToken === 'string' && result.authToken) {
                    resolve(result.authToken);
                    console.log('authToken gotten in bg');
                } else {
                    reject('No access token found');
                }
            });
        });
        const userId = await new Promise<string>((resolve, reject) => {
            chrome.storage.local.get('userId', (result) => {
                if (typeof result.userId === 'string' && result.userId) {
                    resolve(result.userId);
                    console.log('userId gotten in bg');
                } else {
                    reject('No user id found');
                }
            });
        });

        console.log('Access token found: ', accessToken);
        console.log('User id found: ', userId);

        if (!accessToken) {
            console.error('No access token found!');
            return;
        }
        
        if (!userId) {
            console.error('No userId found2!');
            return;
        }

        const response = await saveHistory(
            userId, 
            {
                url,
                timestamp: new Date(lastVisitTime),
                title,
            }, 
            accessToken
        );

        if (response.error) {
            console.error('Error saving history: ', response.error);
        }

        console.log('History sent: ', response.data);
    } catch (error) {
        console.error('Error saving history: ', error);
    }
});