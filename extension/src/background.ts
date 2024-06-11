import { saveHistory } from "./services/user.service";
import { saveActiveTab } from "./services/user.service";
import { getAccessToken, getUserId } from "./services/storage.service";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        const accessToken = await getAccessToken();
        const userId = await getUserId();
        if (!accessToken || !userId) return;

        chrome.tabs.get(activeInfo.tabId, async (tab) => {
            if (!tab.url) {
                await saveActiveTab(userId, {
                    url: "offline",
                    timestamp: new Date(),
                    title: "offline",
                }, accessToken);
            } else {
                await saveActiveTab(userId, {
                    url: tab.url,
                    timestamp: new Date(),
                    title: tab.title ?? "No Title",
                }, accessToken);
            }
        });
    } catch (error) {
        console.log('Error in onActivated event:', error);
    }
});

chrome.idle.setDetectionInterval(15 * 60); // 15 min
chrome.idle.onStateChanged.addListener(async (state) => {
    try {
        const accessToken = await getAccessToken();
        const userId = await getUserId();

        if (state === "idle" || state === "locked") {
            await saveActiveTab(userId, {
                url: "offline",
                timestamp: new Date(),
                title: "offline",
            }, accessToken);
        }
    } catch (error) {
        console.log('Error in onStateChanged event:', error);
    }
});

chrome.history.onVisited.addListener(async (historyItem) => {
    try {
        const url = historyItem.url ?? ""; 
        const lastVisitTime = historyItem.lastVisitTime ?? Date.now();
        const title = historyItem.title ?? "No Title"; 

        const accessToken = await getAccessToken();
        const userId = await getUserId();
        if (!accessToken || !userId) return;

        await saveHistory(
            userId, 
            {
                url,
                timestamp: new Date(lastVisitTime),
                title,
            }, 
            accessToken
        );
    } catch (error) {
        console.log('Error in onVisited event:', error);
    }
});
