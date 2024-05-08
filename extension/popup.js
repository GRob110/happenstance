const baseAuthUrl = "https://dev-6q2l8zmczwn7un71.us.auth0.com/authorize";
const queryParams = new URLSearchParams({
    client_id: "NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV",
    response_type: "token",
    redirect_uri: chrome.identity.getRedirectURL(),
    scope: "openid profile email",
    response_mode: "fragment"
});
const authUrl = `${baseAuthUrl}?${queryParams.toString()}`;

console.log("Gnerated Auth URL: ", authUrl);

function handleAuthResult(redirectUrl) {
    const url = new URL(redirectUrl);
    // Auth0 returns the access token in the URL hash fragment
    const hashParams = new URLSearchParams(url.hash.substring(1));
    const accessToken = hashParams.get('access_token');

    console.log('Auth code:', accessToken);

    if (!accessToken) {
        console.error('No access token found');
        return;
    }

    // Fetch user info using access token
    fetch('https://dev-6q2l8zmczwn7un71.us.auth0.com/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => response.json())
    .then(profile => {
        console.log('User profile:', profile);
        console.log('Username:', profile.name);
        chrome.storage.local.set({username: profile.name});
    }).catch(error => {
        console.error('Profile request error:', error);
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