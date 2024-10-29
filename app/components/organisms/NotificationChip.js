import React from 'react'
import { LuBell } from 'react-icons/lu'

function NotificationChip({ data }) {
  return (
    <div className="relative">
      <div className="flex gap-2 py-3">
        <div className="">
          <div className="w-7 h-7 bg-black overflow-hidden rounded-full text-white items-center justify-center grid"><LuBell /></div>
        </div>
        <div className="space-y-1">
          <div className={`trunck-text font-normal pr-3`}>{data.data.message}</div>
          <div></div>
        </div>
      </div>
      <div className="bottom-0 max-w-5xl mx-auto px-2">
        <div className="bg-gray-100 dark:bg-gray-600 pt-[1px]"></div>
      </div>
    </div>
  )
}

export default NotificationChip