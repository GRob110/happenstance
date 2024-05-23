window.addEventListener('message', (event) => {
    console.log('popup.js received message');
    if (event.data.type === 'STORE_TOKEN') {
        console.log('content.js received message', event.data);
        chrome.storage.local.set({ authToken: event.data.token, user: event.data.user }, () => {
            console.log('authToken stored');
        });
    }
}, false);