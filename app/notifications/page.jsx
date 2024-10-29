"use client"
import React, { useEffect, useState } from 'react'
import AppLayout from '@component/layouts/appLayout'
import NotificationChip from '@/app/components/organisms/NotificationChip'
import { fetchNotification } from '../services/authService'

function Page() {
  const [notification, setNotification] = useState([])

  const getNotification = async () => {
    const { status, data } = await fetchNotification().catch(err => console.log(err))
    if (status) {
      console.log(data)
      setNotification(data.data.notifications)
    }
  }

  useEffect(() => {
    getNotification()
  }, [])

  return (
    <AppLayout>
      <div className="relative dark:bg-[#202B37]">
        <div className="max-w-6xl mx-auto">
          <div className="text-black-1 text-center font-bold dark:text-white-1 text-lg md:text-left">Notification</div>
          <div className="">
            {
              notification?.map((notifiktion, i) => (
                <div key={i}><NotificationChip data={notifiktion} /></div>
              ))
            }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Page