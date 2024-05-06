const baseAuthUrl = "https://dev-6q2l8zmczwn7un71.us.auth0.com/authorize";
const queryParams = new URLSearchParams({
    client_id: "NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV",
    response_type: "code",
    redirect_uri: chrome.identity.getRedirectURL(),
    scope: "openid profile email",
    code_challenge_method: "S256"
});
const authUrl = `${baseAuthUrl}?${queryParams.toString()}`;


function beginAuth() {
    console.log('Beginning auth flow');
    console.log('authUrl: ', authUrl);
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
        alert('Authorization redirect URL: ' + redirectUrl);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginBtn');
    loginButton.addEventListener('click', () => {
        console.log("login button clicked");
        beginAuth();
    });
});