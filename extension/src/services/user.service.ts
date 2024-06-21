import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getUserData = async (userId: string) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? userDoc.data() : null;
};

export const saveUserData = async (userId: string, userData: any) => {
  await setDoc(doc(db, "users", userId), userData, { merge: true });
};

export const saveHistory = async (userId: string, history: { url: string, timestamp: Date, title: string }) => {
  await updateDoc(doc(db, "users", userId), {
    history: arrayUnion(history)
  });
};

export const saveActiveTab = async (userId: string, activeTab: { url: string, timestamp: Date, title: string }) => {
  await updateDoc(doc(db, "users", userId), { activeTab });
};
