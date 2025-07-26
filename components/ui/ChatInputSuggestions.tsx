'use client'

import React from 'react'

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string) => void
  visible: boolean
  className?:string
}

const suggestions = [
  'Create image',
  'Code',
  'Summarize text',
  'Analyze images',
  'Brainstorm',
  'Help me write',
  'Make a plan',
  'Analyze data',
  'Surprise me',
  'Get advice',
]

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({
  onSuggestionClick,
  visible,
  className
}) => {
  if (!visible) return null

  return (
    <div className={`flex flex-wrap gap-2 px-4 pb-2 animate-fadeIn ${className}`}>
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSuggestionClick(item)}
          className="px-4 py-2 bg-[#3d2072] text-white rounded-full hover:bg-[#5e2ea3] text-sm transition"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default ChatSuggestions
