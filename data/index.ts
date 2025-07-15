import { Message, MessageThreadProps } from "./interfaces";

// export const messageThreads: MessageThreadProps[] = [
//   {
//     name: "Theresa Webb",
//     lastMessage: "Ok, let me check",
//     time: "27 min",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "theresa-webb",
//   },
//   {
//     name: "Eleanor Pena",
//     lastMessage: "Ok, let me check",
//     time: "28 min",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "eleanor-pena",
//   },
//   {
//     name: "Marvin McKinney",
//     lastMessage: "Ok, let me check",
//     time: "12:13 PM",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "marvin-mckinney",
//   },
//   {
//     name: "Arlene McCoy",
//     lastMessage: "Ok, let me check",
//     time: "Yesterday",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "arlene-mccoy",
//   },
//   {
//     name: "Bessie Cooper",
//     lastMessage: "Ok, let me check",
//     time: "14 Jan",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "bessie-cooper",
//   },
//   {
//     name: "Wade Warren",
//     lastMessage: "Sure, I will do that",
//     time: "10 min",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "wade-warren",
//   },
//   {
//     name: "Courtney Henry",
//     lastMessage: "Thanks for the update",
//     time: "1 hour",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "courtney-henry",
//   },
//   {
//     name: "Albert Flores",
//     lastMessage: "Let’s catch up later",
//     time: "2 days",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "albert-flores",
//   },
//   {
//     name: "Jenny Wilson",
//     lastMessage: "Got it, thanks!",
//     time: "3 days",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "jenny-wilson",
//   },
//   {
//     name: "Kristin Watson",
//     lastMessage: "See you tomorrow",
//     time: "Last week",
//     avatar: "https://api.dicebear.com/7.x/icons/png?seed=Music",
//     slug: "kristin-watson",
//   },
// ];

export const ChatMessages: Message[] = [
  { sender: "other", message: "Hello! What's up", time: "12:17 PM" },
  {
    sender: "me",
    message: "1200 EGP",
    time: "12:17 PM",
    isMoneyTransfer: true,
  },
  {
    sender: "me",
    message: "1200 EGP",
    time: "12:17 PM",
    isMoneyTransfer: true,
  },
  {
    sender: "me",
    message: "I'm doing great ! how are you today?",
    time: "12:17 PM",
  },
  {
    sender: "me",
    message: "I'm doing great ! how are you today?",
    time: "12:17 PM",
  },
  {
    sender: "other",
    message: "I'm focusing on traveling these days",
    time: "12:17 PM",
  },
];