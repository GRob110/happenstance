import { saveActiveTab, saveHistory } from "./services/user-service";
import { getAuth } from "firebase/auth/web-extension";

const auth = getAuth();

console.log('background.ts');

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.log('onActivated');
  const user = auth.currentUser;
  if (!user) return;

  chrome.tabs.get(activeInfo.tabId, async (tab) => {
    console.log('onActivated tab', tab);
    const activeTab = {
      url: tab.url || "offline",
      timestamp: new Date(),
      title: tab.title || "No Title",
    };
    await saveActiveTab(user.uid, activeTab);
    await saveHistory(user.uid, activeTab);
    console.log('saved active tab');
  });
});

/*
chrome.history.onVisited.addListener(async (historyItem) => {
  console.log('onVisited');
  const user = auth.currentUser;
  if (!user) return;

  const history = {
    url: historyItem.url || "",
    timestamp: new Date(historyItem.lastVisitTime || Date.now()),
    title: historyItem.title || "No Title",
  };
  await saveHistory(user.uid, history);
});
*/
