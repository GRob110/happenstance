window.addEventListener('message', (event) => {
    if (event.data.type === 'STORE_TOKEN') {
        chrome.storage.local.set({ authToken: event.data.token, userId: event.data.userId }, () => {
        });
        console.log('Token stored in content: ', event.data.token);
        console.log('User stored in content: ', event.data.userId);
    }
}, false);
