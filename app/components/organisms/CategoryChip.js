"use client"
import { changeGiftCardCategoryStatus, changeGiftCardStatus } from '@/app/services/authService';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

function CategoryChip({ data, reload, setUpdateItem }) {
    const [optionOpen, setOpen] = useState(false)
    const changeStatus = async (id) => {
        const { status, data } = await changeGiftCardCategoryStatus({ id }).catch(err => console.log(err))
        if (status) {
            reload()
        }
    }
    return (
        <div className="px-4 py-4 space-y-4 border border-gray-200 rounded-md bg-white">
            <div className="">
                <div className="flex items-start">
                    <div className="flex-grow">
                        <div className="w-12 h-12 rounded-full"><img src={data.image} className='bg-contain' width={100} height={100} /></div>
                    </div>
                    <div className="relative">
                        <div onClick={() => setOpen(true)} className='w-8 h-8 cursor-pointer flex items-center justify-center text-2xl text-gray-500'><IoEllipsisHorizontalOutline /></div>
                        <div onMouseLeave={() => setOpen(false)} className={`absolute ${!optionOpen && "hidden"} bg-white w-44 font-[500] shadow-lg text-sm border border-gray-100 rounded-md top-0 p-1 right-0`}>
                            <Link href={`gift_cards/${data?.id}`}>
                                <div className='hover:bg-gray-50 py-2 px-3 rounded-md cursor-pointer text-gray-500'>View</div>
                            </Link>
                            <div onClick={() => setUpdateItem(data)} className='hover:bg-gray-50 py-2 px-3 rounded-md cursor-pointer text-gray-500'>Edit Category Info</div>
                            <div onClick={() => changeStatus(data.id)}>
                                {
                                    data?.status === "active" ? (
                                        <div className='hover:bg-gray-50 py-2 px-3 rounded-md cursor-pointer text-danger'>Deactivate</div>
                                    ) : (
                                        <div className='hover:bg-gray-50 py-2 px-3 rounded-md cursor-pointer text-success'>Activate</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-bold">{data.name}</div>
                <div className={`inline-block ${data.status === "active" ? "bg-success text-success" : "bg-danger text-danger"} bg-opacity-10 px-3 text-[8px] rounded-3xl py-1`}>
                    {data.status}
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex-grow text-sm text-gray-400">Monthly report analytics</div>
                <div className="-space-x-3">
                    {
                        data?.giftcard?.map((el, i) => (
                            <div key={i} className="w-8 inline-block h-8 rounded-full">
                                <img src={el.image} width={100} height={100} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryChip