const AUTH0_DOMAIN = 'happenstance-dev.us.auth0.com';
const AUTH0_CLIENT_ID = 'wfn5Nvd0yz9pKynMz4lSxCLpMthiN38c';
const AUTH0_AUDIENCE = 'https://happenstance.gunnerbuilds.com';
const API_SERVER_URL = 'http://localhost:5000';
const LOGIN_URL = 'http://localhost:3000';

/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes(`${LOGIN_URL}/callback`)) {
        chrome.tabs.sendMessage(tabId, { action: 'getAuthToken' }, (response) => {
            if (response && response.authToken) {
                chrome.storage.local.set({ authToken: response.authToken, user: response.user }, () => {
                    console.log('user is logged in');
                });
            }
        });
    }
});
*/