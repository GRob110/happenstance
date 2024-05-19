const AUTH0_DOMAIN = 'happenstance-dev.us.auth0.com';
const AUTH0_CLIENT_ID = 'wfn5Nvd0yz9pKynMz4lSxCLpMthiN38c';
const AUTH0_CALLBACK_URL = chrome.identity.getRedirectURL();
//const AUTH0_CALLBACK_URL = 'http://localhost:3000/callback';
const AUTH0_AUDIENCE = 'https://happenstance.gunnerbuilds.com';
const API_SERVER_URL = 'http://localhost:5000';
const LOGIN_URL = 'http://localhost:3000';

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'login') {
        console.log('login clicked');
        chrome.tabs.create({ url: LOGIN_URL });
    } else if (message.type === 'logout') {
        console.log('logout clicked');
        chrome.tabs.create({ url: LOGIN_URL });
    } else if (message.type === 'fetchUser') {
        console.log('fetchUser');
        try {
            let response = await fetch(`${LOGIN_URL}/profile`, {
                credentials: 'include',
            }); //does this need headers, token, or type? server or cient addy?
            if (!response.ok) {
                throw new Error('Network response was not ok');
                return response.json();
            }

            let contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                let data = await response.json();
                console.log('fetchUser data: ', data);
                sendResponse({ user: data });
                return true;
            } else {
                let text = await response.text();
                console.log('fetchUser text: ', text);
                sendResponse({ user: text });
                return true;
            }
        } catch (error) {
            console.error('Error fetching user', error);
            return false;
        }
        return true;
    }
});