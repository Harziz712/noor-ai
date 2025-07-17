import React from 'react'

interface MessagewallProp{
    showGreeting: boolean;
}

const MessageWall = ({showGreeting}:MessagewallProp) => {
  return (
          <div className="flex-1 overflow-y-auto px-2 pt-4 pb-32">
        {showGreeting && (
          <div className="flex items-center gap-4 bg-[#2c1555] rounded-xl px-4 py-3 mb-4 w-fit max-w-sm">
            <img
              src="user.jpeg"
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-sm leading-snug">
              <p className="font-medium">Hello Azeez,</p>
              <p className="text-white/80">How is your day going?</p>
            </div>
          </div>
        )}
        </div>
  )
}

export default MessageWall