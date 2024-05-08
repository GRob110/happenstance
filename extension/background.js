chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'exchangeAuthCode') {
        // Exchange the auth code for an access token
        const tokenExchangeUrl = "https://dev-6q2l8zmczwn7un71.us.auth0.com/oauth/token";
        fetch(tokenExchangeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: "NRfoOLMeJcJLxqS5i2carZc9EmP3ODaV",
                code: message.authCode,
                redirect_uri: chrome.identity.getRedirectURL(),
            })
        }).then(response => response.json())
        .then(data => {
            if (data.access_token) {
                fetch('https://dev-6q2l8zmczwn7un71.us.auth0.com/userinfo', {
                    headers: {
                        Authorization: `Bearer ${data.access_token}`
                    }
                }).then(resp => resp.json())
                .then(profile => {
                    console.log('User profile:', profile);
                    chrome.storage.local.set({username: profile.name}, () => {
                        sendResponse({success: true, profile: profile});
                    });
                }).catch(error => {
                    console.error('Profile request error:', error);
                    sendResponse({success: false});
                });
            } else {
                console.error('No access token found');
                sendResponse({success: false});
            }
        })
        .catch(error => {
            console.error('Token exchange error:', error);
            sendResponse({success: false});
        });
        return true; // Indicates that sendResponse will be called asynchronously
    }
});