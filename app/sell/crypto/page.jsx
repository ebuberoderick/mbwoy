'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import Modal from '@/app/components/organisms/Modal'
import { fetchCryptos } from '@/app/services/authService'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaRegFileLines } from 'react-icons/fa6'
import { IoIosArrowRoundBack } from 'react-icons/io'

function Page() {
    const router = useRouter()

    const [cryptos, setCrypto] = useState([])
    const [loading, setLoading] = useState(true)

    const fetch = async () => {
        const { status, data } = await fetchCryptos().catch(err => console.log(err))
        if (status) {
            setCrypto(data.data[0]);
        }
        setLoading(false)
    }


    useEffect(() => {
        fetch()
    }, [])


    return (
        <AppLayout title={`Sell Crypto`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow items-center flex">
                        <div className="flex-grow">
                            <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                                <IoIosArrowRoundBack /> Back
                            </div>
                        </div>
                        <Link href="crypto/transactions">
                            <div className="cursor-pointer flex items-center gap-1">
                                <FaRegFileLines />
                                Transactions
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {
                        cryptos.map((data, i) => (
                            <Link href={`crypto/${data.id}`} key={i} className="py-3 space-y-1 cursor-pointer border rounded-xl">
                                <div className="sm:w-16 w-10 sm:h-16 h-10 mx-auto">
                                    <img src={data.icon} className='bg-contain' width={100} height={100} />
                                </div>
                                <div className="font-bold sm:text-xl text-center">{data.name}</div>
                            </Link>
                        ))
                    }
                    {

                        loading && ["", "", "", "", "", ""].map((data, i) => (
                            <div key={i} className="py-3 space-y-1 cursor-pointer border rounded-xl">
                                <div className="sm:w-16 w-10 sm:h-16 h-10 mx-auto preload rounded-full"></div>
                                <div className="font-bold sm:text-xl text-center preload w-2/3 mx-auto py-3"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    )
}

export default Page