const AUTH0_DOMAIN = 'happenstance-dev.us.auth0.com';
const AUTH0_CLIENT_ID = 'wfn5Nvd0yz9pKynMz4lSxCLpMthiN38c';
const AUTH0_AUDIENCE = 'https://happenstance.gunnerbuilds.com';
const API_SERVER_URL = 'http://localhost:6060';
const LOGIN_URL = 'http://localhost:4040';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    const logoutButton = document.getElementById('logoutBtn');
    const userInfoDiv = document.getElementById('user-info');

    console.log('popup.js loaded');

    chrome.storage.local.get(['authToken'], (result) => {
        console.log('authToken', result.authToken);
        if (result.authToken) {
            displayUserInfo(result.authToken);
        } else {
            displayLogin();
        }
    });


    loginButton.addEventListener('click', () => {
        chrome.tabs.create({ url: LOGIN_URL });
        console.log('login clicked');
    });

    logoutButton.addEventListener('click', () => {
        chrome.tabs.create({ url: LOGIN_URL });
        chrome.storage.local.remove(['authToken'], () => {
            displayLogin();
        });
        console.log('logout clicked');
    });

    async function fetchMessage(token) {
        console.log('fetching message');
        try {
            const response = await fetch(`${API_SERVER_URL}/api/messages/protected`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');  
            }
            const data = await response.json();
            console.log('message info', data);
            return data;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return error;
        }
    }

    async function fetchUserInfo(token) {
        console.log('fetching user info');
        try {
            const response = await fetch(`https://${AUTH0_DOMAIN}/userinfo`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');  
            }
            const data = await response.json();
            console.log('user info', data);
            return data;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return error;
        }
    }

    async function displayUserInfo(token) {
        console.log('fetching user info');
        const message = await fetchMessage(token);
        const userInfo = await fetchUserInfo(token);
        console.log('message', message);
        console.log('userInfo', userInfo);
        userInfoDiv.textContent = `message: ${message.text}, user: ${userInfo.name}`;
        userInfoDiv.style.display = 'block';
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    }
    
    function displayLogin() {
        console.log('displaying login');
        userInfoDiv.style.display = 'none';
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }

    /*
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('popup.js received message', request);
        if (request.type === 'STORE_TOKEN') {
            console.log('storing token', request.token);
            chrome.storage.local.set({ auth0Token: request.token, auth0User: request.user }, () => {
                sendResponse({ status: 'success' });
                console.log('token stored');
            });
            return true;
        }
    });
    */
});