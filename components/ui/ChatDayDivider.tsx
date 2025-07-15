import React from 'react';

interface ChatDayDividerProps {
  day: string;
}

const ChatDayDivider: React.FC<ChatDayDividerProps> = ({ day }) => (
  <div className="text-center text-xs text-gray-500 my-4">{day}</div>
);

export default ChatDayDivider;