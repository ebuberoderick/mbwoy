"use client"
import { changeGiftCardStatus } from '@/app/services/authService';
import React, { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai';
import { CiCreditCard1, CiCreditCardOff } from 'react-icons/ci';

function GiftCardChip({ data, refresh, upDate }) {
    const sell_rate_high = Number(data.sell_rate_high)
    const sell_rate_low = Number(data.sell_rate_low)
    const [processing, setProcessing] = useState(false)

    const changeStatus = async (id) => {
        setProcessing(true)
        const { status, data } = await changeGiftCardStatus({ id }).catch(err => console.log(err))
        if (status) {
            setProcessing(false)
            refresh()
        }
    }

    return (
        <div className="px-4 py-4 space-y-4 border border-gray-200 rounded-md bg-white">
            <div className="">
                <div className="flex items-start">
                    <div className="flex-grow">
                        <div className="w-12 h-12 rounded-full overflow-hidden"><img src={data.image} width={100} height={100} /></div>
                    </div>
                    <div>
                        {
                            processing ? (
                                <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer'>
                                    <AiOutlineLoading className='animate-spin' />
                                </div>
                            ) : (
                                <div onClick={() => changeStatus(data.id)} title={data.status === "active" ? "Click to deactivate" : "Click to activate"} className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer'>
                                    {
                                        data.status === "active" ? <CiCreditCard1 /> : <CiCreditCardOff />
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <div>
                    <div className="text-xl font-bold">{data.name}</div>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div className=''>
                    <div className='font-bold'>Sell rate high:</div>
                    <div className='text-gray-500'>&#8358;{sell_rate_low.toLocaleString('en-US')}</div>
                </div>
                <div className=''>
                    <div className='font-bold'>Sell rate high:</div>
                    <div className='text-gray-500'>&#8358;{sell_rate_high.toLocaleString('en-US')}</div>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className={`inline-block ${data.status === "active" ? "bg-success text-success" : "bg-danger text-danger"} bg-opacity-10 px-6 text-xs rounded-3xl py-1`}>
                    {data.status}
                </div>
                <div onClick={upDate} className={`text-white bg-black cursor-pointer px-6 text-xs rounded-3xl py-1`}>
                    Update
                </div>
            </div>
        </div>
    )
}

export default GiftCardChip