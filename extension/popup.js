document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    const logoutButton = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('user-info');
    const historyList = document.getElementById('history-list');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'login' });
            console.log('login clicked');
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'logout' });
            console.log('logout clicked');
        });
    }

    chrome.runtime.sendMessage({ type: 'fetchUser' }, (response) => {
        if (response.user.isAuthenticated) {
            console.log('User found', response.user.name);
            userInfo.textContent = `Logged in as ${response.user.name}`;
            loginButton.style.display = 'none';
            logoutButton.style.display = 'block';
        } else if (!response.user.isAuthenticated){
            console.log('Not logged in');
            userInfo.textContent = 'Not logged in';
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
        } else if (response.error) {
            console.error('Error fetching user', response.error);
            userInfo.textContent = `Error: ${response.error}`;
            loginButton.style.display = 'block';
            logoutButton.style.display = 'none';
        } else {
            console.error('something else');
        }
    });

    chrome.storage.local.get({ history: [] }, (result) => {
        console.log('loading history', result.history);
        const history = result.history;
        history.forEach((entry) => {
            const li = document.createElement('li');
            li.textContent = `${entry}`;
            historyList.appendChild(li);
        });
    });
});