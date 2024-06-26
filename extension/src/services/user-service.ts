import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Tab } from "../models/tab";
import { User } from "../models/user";
import { onSnapshot } from "firebase/firestore";

// TODO: prevent injection attacks

export const getUserData = async (userId: string): Promise<User | null> => {
  console.log('getUserData', userId);
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? userDoc.data() as User : null;
};

export const saveUserData = async (userId: string, userData: User) => {
  await setDoc(doc(db, "users", userId), userData, { merge: true });
};

export const saveFriend = async (userId: string, friendId: string) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    const userData = userDoc.data() as User;
    const friends = userData.friends || [];
    if (!friends.includes(friendId)) {
      friends.push(friendId);
      await updateDoc(userDocRef, { friends });
    }
  }
};


// TODO: this is still a placeholder
export const getAllUsers = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  const userNames = snapshot.docs.map(doc => doc.data().name);
  return userNames;
};

export const getMostRecentActiveTab = async (userId: string): Promise<Tab | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists() && userDoc.data().activeTab) {
    return userDoc.data().activeTab as Tab;
  } else {
    return null;
  }
};


export const saveActiveTab = async (userId: string, activeTab: Tab) => {
  await updateDoc(doc(db, "users", userId), { activeTab });
};

// TODO: this is still a placeholder
export const getActiveTabs = (userId: string, callback: (tabs: { friendId: string; activeTab: Tab | null }[]) => void) => {
  const userDocRef = doc(db, "users", userId);
  return onSnapshot(userDocRef, async (userDoc) => {
    if (!userDoc.exists() || !userDoc.data().friends) {
      callback([]);
      return;
    }
    const friendIds = userDoc.data().friends as string[];
    const friendsTabs = await Promise.all(
      friendIds.map(async (friendId) => {
        const friendDoc = await getDoc(doc(db, "users", friendId));
        if (friendDoc.exists() && friendDoc.data().activeTab) {
          return { friendId, activeTab: friendDoc.data().activeTab };
        } else {
          return { friendId, activeTab: null };
        }
      })
    );
    callback(friendsTabs.filter(tab => tab.activeTab !== null));
  });
};

export const saveHistory = async (userId: string, historyTab: Tab) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) return;

  let history = userDoc.data().history || [];
  if (history.length > 0 && history[history.length - 1].url === historyTab.url) {
    // If the last URL is the same as the new one, do not add it to the history
    return;
  }

  history.push(historyTab);
  if (history.length > 10) {
    history = history.slice(-10); // Keep only the last 10 entries
  }

  await updateDoc(userDocRef, { history });
};
