const authUrl = `https://dev-6q2l8zmczwn7un71.us.auth0.com/authorize` +
    `?client_id=NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(chrome.identity.getRedirectURL())}` +
    `&scope=openid profile email` +
    `&code_challenge_method=S256`;

function beginAuth() {
    chrome.identity.launchWebAuthFlow({
        url: authUrl,
        interactive: true
    }, function(redirectUrl) {
        if (chrome.runtime.lastError || !redirectUrl) {
            console.error(chrome.runtime.lastError ? chrome.runtime.lastError.message : 'No redirect URL');
            return;
        }
        console.log('Authorization redirect URL:', redirectUrl);
    });
}

chrome.runtime.onInstalled.addListener( function() {
    chrome.action.onClicked.addListener(beginAuth);
});