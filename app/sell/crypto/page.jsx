'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import Modal from '@/app/components/organisms/Modal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

function Page() {
  const router = useRouter()
  return (
        <AppLayout title={`Sell Crypto`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow flex">
                        <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    <Link href={`crypto/tr`} className="py-3 space-y-1 cursor-pointer border rounded-xl">
                        <div className="sm:w-16 w-10 sm:h-16 h-10 mx-auto rounded-full bg-gray-50"></div>
                        <div className="font-bold sm:text-xl text-center">name</div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    )
}

export default Page