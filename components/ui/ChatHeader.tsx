import React from 'react';

interface ChatHeaderProps {
  avatar: string;
  name: string;
  lastSeen: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ avatar, name, lastSeen }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src={avatar} alt={name} className="w-full h-full object-cover bg-white" />
      </div>
      <div>
        <p className="font-medium text-paragraph">{name}</p>
        <p className="text-xs text-gray-500">{lastSeen}</p>
      </div>
    </div>
  );
};

export default ChatHeader;