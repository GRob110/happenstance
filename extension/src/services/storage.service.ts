export function getAccessToken() {
    return new Promise<string>((resolve, reject) => {
        chrome.storage.local.get('authToken', (result) => {
            if (typeof result.authToken === 'string' && result.authToken) {
                resolve(result.authToken);
            } else {
                reject('No access token found');
            }
        });
    });
}

export function getUserId() {
    return new Promise<string>((resolve, reject) => {
        chrome.storage.local.get('userId', (result) => {
            if (typeof result.userId === 'string' && result.userId) {
                resolve(result.userId);
            } else {
                reject('No user id found');
            }
        });
    });
}