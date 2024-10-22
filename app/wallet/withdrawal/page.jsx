'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

function Page() {
    const router = useRouter()

    const fetch = async () => {
        // const { status, data } = await fetchCryptoOrder().catch(err => console.log(err))
        // if (status) {
        //     setOrders(data.data[0]);
        // }
        // setLoading(false)
    }


    useEffect(() => {
        fetch()
    }, [])

    return (
        <AppLayout title={`Withdrawal`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow items-center flex">
                        <div className="flex-grow">
                            <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                                <IoIosArrowRoundBack /> Back
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3">
                    
                </div>
            </div>
        </AppLayout>
    )
}

export default Page