const loginUrl = 'http://localhost:3000/';

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