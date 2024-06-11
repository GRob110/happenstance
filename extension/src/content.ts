window.addEventListener('message', (event) => {
    if (event.data.type === 'STORE_TOKEN') {
        chrome.storage.local.set({ authToken: event.data.token, userId: event.data.userId }, () => {
        });
    }
}, false);
