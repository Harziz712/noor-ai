export interface Message {
  sender: "other" | "me" | "system";
  message: string;
  time: string;
  isMoneyTransfer?: boolean;
}
export interface MessageThreadProps {
  name: string;
  slug: string;
  lastMessage: string;
  time: string;
  avatar: string;
}