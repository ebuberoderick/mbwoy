'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

function Page() {
  const router = useRouter()
  return (
        <AppLayout title={`Sell E-fund`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow flex">
                        <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back
                        </div>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                    
                </div>
            </div>
        </AppLayout>
    )
}

export default Page