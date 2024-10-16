import React from 'react'

function NotificationChip({ data }) {
  return (
    <div className="relative">
      <div className="flex gap-2 py-3">
        <div className="">
          <div className="w-7 h-7 bg-gray-200 overflow-hidden rounded-full"><img src={data.user.avatar} /></div>
        </div>
        <div className="space-y-1">
          <div className="font-semibold text-sm dark:text-white-1">{data.type.replaceAll("_"," ")}</div>
          <div className={`trunck-text font-normal text-xs pr-3`}>{data.message}</div>
        </div>
      </div>
      <div className="bottom-0 max-w-5xl mx-auto px-2">
        <div className="bg-gray-100 dark:bg-gray-600 pt-[1px]"></div>
      </div>
    </div>
  )
}

export default NotificationChip