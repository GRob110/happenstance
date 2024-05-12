const loginUrl = 'http://localhost:3000/';
let history = [];

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'login') {
        console.log('login clicked');
        chrome.tabs.create({ url: loginUrl });
    } else if (message.type === 'logout') {
        console.log('logout clicked');
        chrome.tabs.create({ url: loginUrl });
    } else if (message.type === 'sync') {
        console.log('sync clicked');
        sendHistoryToWebApp();
    } else if (message.type === 'fetchUser') {
        console.log('fetchUser');
        fetch('http://localhost:3000/profile', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                sendResponse({ user: data });
                return true;
            })
            .catch(error => {
                console.error('Error fetching user', error);
                sendResponse({ error: error.message });
                return false;
            });
        return true;
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        // get the current timestamp
        const timestamp = new Date().toISOString();
        // Sace the URL and timestamp locally
        history.push(changeInfo.url);
        chrome.storage.local.set({ history: history });
        console.log('Set history', history);
        
        if (history.length > 10) {
            // remove entries older than 10
            history.shift();
        }
    }
});

function sendHistoryToWebApp() {
    chrome.storage.local.get({ history: [] }, (result) => {
        history = result.history || [];
        console.log('Sending history', history);
        console.log('Sending history', JSON.stringify({history}));
        //TODO connect to a user
        fetch('http://localhost:3000/api/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({history}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('History sent', data);
            })
            .catch(error => {
                console.error('Error sending history', error);
            });
    });
}

// send history to web app every 5 minutes
setInterval(sendHistoryToWebApp, 5 * 60 * 1000);