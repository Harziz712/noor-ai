import { Menu, Sheet } from 'lucide-react'
import React from 'react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './sheet'

const ChatList = () => {
  return (
   <Sheet>
  <SheetTrigger>
    
         <span className="h-[36px] w-[36px] flex justify-center items-center bg-[#3d2072] hover:bg-[#5e2ea3] rounded-full transition">
                <Menu className="cursor-pointer text-white" size={20} />
              </span>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default ChatList