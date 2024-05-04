setTimeout(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const loginButton = document.getElementById('loginBtn');
        console.log('Login button found: ', !!loginButton);
        if (loginButton) {
            loginButton.addEventListener('click', () => {
                chrome.runtime.getBackgroundPage((backgroundPage) => {
                    backgroundPage.beginAuth();
                });
            });
        } else {
            console.error('No login button found');
        }
    });
}, 1000);