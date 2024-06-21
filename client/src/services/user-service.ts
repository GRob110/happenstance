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
