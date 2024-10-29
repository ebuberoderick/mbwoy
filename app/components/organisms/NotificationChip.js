import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { LuBell } from 'react-icons/lu'

function NotificationChip({ data }) {

  const [time,setTime] = useState("")

  const getTime = (date) => {
    let result = moment(date).fromNow();
    const now = moment();
    const days = now.diff(date, 'days');
    const weeks = now.diff(date, 'weeks');
    if (days >= 7) {
      if (days <= 13) {
        result = `a week ago`;
      } else if (days > 13 && days <= 25) {
        result = `${weeks} weeks ago`;
      }
    }
    setTime(result)
  };

  useEffect(() => {
    getTime(data?.updated_at)
  }, [])
  
  
  return (
    <div className="relative py-1">
      <div className="flex gap-2 p-3 border border-black rounded-xl">
        <div className="">
          <div className="w-7 h-7 bg-black overflow-hidden rounded-full text-white items-center justify-center grid"><LuBell /></div>
        </div>
        <div className="space-y-1">
          <div className={`font-normal pr-3`}>{data.data.message}</div>
          <div className='flex text-xs text-gray-400'>{time}</div>
        </div>
      </div>
    </div>
  )
}

export default NotificationChip