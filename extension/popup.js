const baseAuthUrl = "https://dev-6q2l8zmczwn7un71.us.auth0.com/authorize";
const queryParams = new URLSearchParams({
    client_id: "NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV",
    response_type: "code",
    redirect_uri: chrome.identity.getRedirectURL(),
    scope: "openid profile email",
    code_challenge_method: "S256"
});
const authUrl = `${baseAuthUrl}?${queryParams.toString()}`;

console.log("Gnerated Auth URL: ", authUrl);

function handleAuthResult(redirectUrl) {
    const url = new URL(redirectUrl);
    const urlParams = new URLSearchParams(url.search);
    const authCode = urlParams.get('code');

    console.log('Auth code:', authCode);

    if (!authCode) {
        console.error('No auth code found');
        return;
    }

    // Exchange the auth code for an access token
    chrome.runtime.sendMessage({
        type: 'exchangeAuthCode',
        authCode: authCode
    }, (response) => {
        if (chrome.runtime.lastError) {
            console.error('Error handling response:', chrome.runtime.lastError.message);
            return;
        }
        if (response.success) {
            console.log('User profile:', response.profile);
            chrome.storage.local.set({username: response.profile.name});
        } else {
            console.error('Token exchange failed');
        }
    });
}

function beginAuth() {
    console.log('Beginning auth flow');
    console.log("Generated Redirect URL: ", chrome.identity.getRedirectURL());


    chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true
    }, function(redirectUrl) {
        if (chrome.runtime.lastError) {
            console.error("Error during authentication:", chrome.runtime.lastError.message);
            return;
        }
        if (!redirectUrl) {
            console.error('No redirect URL');
            return;
        }
        console.log('Authorization redirect URL:', redirectUrl);
        handleAuthResult(redirectUrl);
        chrome.storage.local.get('username', (result) => {
            console.log('username: ', result.username);
        });
    });
}

function logout() {
    chrome.storage.local.remove(['username'], function() {
        console.log('User logged out');
        
        // Redirect to the logout auth0
        const logoutUrl = "https://dev-6q2l8zmczwn7un71.us.auth0.com/v2/logout?client_id=NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV&returnTo=${encodeURIComponent(chrome.identity.getRedirectURL())}";
        window.location.href = logoutUrl;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    loginButton.addEventListener('click', () => {
        console.log("login button clicked");
        beginAuth();
    });
});