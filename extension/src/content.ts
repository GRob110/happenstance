import { saveHistory } from "./services/history.service";

window.addEventListener('message', (event) => {
    console.log('popup.js received message');
    if (event.data.type === 'STORE_TOKEN') {
        console.log('content.js received message', event.data);
        chrome.storage.local.set({ authToken: event.data.token, user: event.data.user }, () => {
            console.log('authToken stored in content.js');
        });
    }
}, false);

chrome.history.onVisited.addListener(async (historyItem) => {
    const url = historyItem.url ?? ""; 
    const lastVisitTime = historyItem.lastVisitTime ?? Date.now();
    const title = historyItem.title ?? "No Title"; 

    try {
        const accessToken = await new Promise<string>((resolve, reject) => {
            chrome.storage.local.get('authToken', (result) => {
                if (typeof result.authToken === 'string' && result.authToken) {
                    resolve(result.authToken);
                } else {
                    reject('No access token found');
                }
            });
        });

        if (!accessToken) {
            console.error('No access token found');
            return;
        }

        const response = await saveHistory(
            'userId', 
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