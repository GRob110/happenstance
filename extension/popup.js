const authUrl = `https://dev-6q2l8zmczwn7un71.us.auth0.com/authorize` +
    `?client_id=NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(chrome.identity.getRedirectURL())}` +
    `&scope=openid profile email` +
    `&code_challenge_method=S256`;

function beginAuth() {
    console.log('Beginning auth flow');

    chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true
    }, function(redirectUrl) {
        if (chrome.runtime.lastError || !redirectUrl) {
            alert(chrome.runtime.lastError ? chrome.runtime.lastError.message : 'No redirect URL');
            return;
        }
        alert('Authorization redirect URL:', redirectUrl);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    loginButton.addEventListener('click', () => {
        console.log("login button clicked");
        beginAuth();
    });
});