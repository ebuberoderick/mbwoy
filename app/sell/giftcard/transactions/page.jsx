'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import { fetchGiftcardOrder } from '@/app/services/authService'
import { TfiGift } from "react-icons/tfi";
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import Ticon from "@assets/images/TIcon.png"
import logo from "@assets/images/viloxLogo.png"
import Image from 'next/image';

function Page() {
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState({})

    const fetch = async () => {
        const { status, data } = await fetchGiftcardOrder().catch(err => console.log(err))
        if (status) {
            setOrders(data.data[0]);
        }
        setLoading(false)
    }


    useEffect(() => {
        fetch()
    }, [])

    return (
        <AppLayout title={`Sell Giftcard Transactions`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow items-center flex">
                        <div className="flex-grow">
                            <div onClick={() => Object.keys(view).length > 0 ? setView({}) : router.back()} className="cursor-pointer flex items-center gap-1">
                                <IoIosArrowRoundBack /> Back
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3">
                    {
                        Object.keys(view).length > 0 ? (
                            <div className="col-span-2 space-y-5 flex-col flex py-20 items-center justify-center w-full">
                                <Image src={logo} className="w-20 mx-auto" alt="LOGO" />
                                <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                    <div className="space-y-3">
                                        <div className="bg-gray-50 py-3 rounded-lg"><img src={view.card.image} className='bg-contain mx-auto' width={50} height={50} /></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="">Country</div>
                                        <div className="font-bold text-lg">{view.card.name}</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="">Card Type</div>
                                        <div className="font-bold text-lg capitalize">{view?.type}</div>
                                    </div>
                                    {
                                        view?.type === `physical` ? (
                                            <div className="flex items-center justify-between">
                                                <div className="">Uploads</div>
                                                <div className="font-bold flex gap-2 text-lg">
                                                    {
                                                        view?.images.map((data, i) => (
                                                            <div key={i} className="h-10 w-10 bg-gray-50">
                                                                <img src={data} alt="" className="w-full h-full" srcset="" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div className="">E-code</div>
                                                <div className="font-bold text-lg">{view?.ecode}</div>
                                            </div>
                                        )
                                    }
                                    <div className="flex items-center justify-between">
                                        <div className="">Rate</div>
                                        <div className="font-bold text-lg">${Number(view?.rate).toLocaleString('en-US')}</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="">Amount</div>
                                        <div className="font-bold text-lg">${Number(view?.amount).toLocaleString('en-US')}</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="">Payment in Naira</div>
                                        <div className="font-bold text-lg">&#8358;{Number(view?.amount_to_pay).toLocaleString('en-US')}</div>
                                    </div>
                                    <div className="flex-grow text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Report issue</div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-span-2 space-y-2">
                                {
                                    orders.map((data, i) => (
                                        <div onClick={() => setView(data)} key={i} className="p-3 flex items-center gap-2 space-y-1 cursor-pointer border rounded-xl">
                                            <div className="">
                                                <div className={`w-10 h-10 bg-gray-50 bg-opacity-50 rounded-full flex items-center justify-center ${data.status === "processing" ? "text-yellow" : data.status === "success" ? "text-success" : "text-danger"}`}>
                                                    <TfiGift />
                                                </div>
                                            </div>
                                            <div className="flex flex-grow items-center justify-between">
                                                <div className="">
                                                    <div className="font-bold text-lg">Sold</div>
                                                    <div className="text-xs">{data.transaction_id}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`font-bold text-lg ${data.status === "processing" ? "text-yellow" : data.status === "success" ? "text-success" : "text-danger"}`}>&#8358;{Number(data.amount).toLocaleString('en-US')}</div>
                                                    <div className="text-xs capitalize">{data.status}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    orders.length === 0 && !loading && (
                                        <div className="space-y-2">
                                            <div className="">
                                                <Image src={Ticon} className='w-44 mx-auto' alt='' />
                                            </div>
                                            <div className="text-center text-gray-400">There is no recent transaction</div>
                                        </div>
                                    )
                                }
                                {
                                    loading && ["", "", "", "", "", ""].map((data, i) => (
                                        <div key={i} className="p-3 flex items-center gap-2 space-y-1 cursor-pointer border rounded-xl">
                                            <div className="">
                                                <div className={`w-10 h-10 bg-gray-50 bg-opacity-50 rounded-full flex items-center justify-center`}>

                                                </div>
                                            </div>
                                            <div className="flex flex-grow items-center justify-between">
                                                <div className="space-y-1 ">
                                                    <div className="font-bold text-lg preload py-3 w-16"></div>
                                                    <div className="text-xs py-1 w-12 preload"></div>
                                                </div>
                                                <div className="space-y-1 ">
                                                    <div className={`font-bold text-lg preload py-3 w-24`}></div>
                                                    <div className="text-xs py-1 capitalize preload w-16 ml-8"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
            </div>
        </AppLayout>
    )
}

export default Page