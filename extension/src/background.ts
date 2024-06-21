import { saveHistory, saveActiveTab } from "./services/user.service";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const user = auth.currentUser;
  if (!user) return;

  chrome.tabs.get(activeInfo.tabId, async (tab) => {
    const activeTab = {
      url: tab.url || "offline",
      timestamp: new Date(),
      title: tab.title || "No Title",
    };
    await saveActiveTab(user.uid, activeTab);
  });
});

chrome.history.onVisited.addListener(async (historyItem) => {
  const user = auth.currentUser;
  if (!user) return;

  const history = {
    url: historyItem.url || "",
    timestamp: new Date(historyItem.lastVisitTime || Date.now()),
    title: historyItem.title || "No Title",
  };
  await saveHistory(user.uid, history);
});
