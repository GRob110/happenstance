chrome.runtime.onClicked.addListener((tab) => {
    if (tab.url) {
        const url = new URL(tab.url);
        chrome.action.setBadgeText({
            text: url.hostname
        });
        console.log(url.hostname);
        //const badge = document.createElement('p');
        //badge.classList.add("color-secondary-text", "type--caption");
        //badge.textContent = url.hostname;
    }
});

/*
chrome.runtime.onClicked.addListener(() => {
    chrome.action.setBadgeText({
        text: 'OFF'
    });
});
*/