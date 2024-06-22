export interface User {
  userId: string;
  name: string;
  email: string;
  friends: string[];
  history: { url: string; timestamp: Date; title: string }[];
  activeTab: { url: string; timestamp: Date; title: string };
}
