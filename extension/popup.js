document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn')
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'login' });
            console.log('login clicked');
        });
    }

    chrome.runtime.sendMessage({ type: 'fetchUser' }, (response) => {
        console.log('fetchUser awaiting');
        if (response.user) {
            console.log('User found', response.user.name);
            document.getElementById('user-info').textContext = `Hello, ${response.user.name}`;
        } else if (response.error) {
            document.getElementById('user-info').textContext = `Error: ${response.error}`;
        }
    });
});