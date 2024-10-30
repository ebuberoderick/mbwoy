'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AppInput from '@/app/components/organisms/AppInput'
import { RiUploadCloud2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import { MdOutlineFileCopy } from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { fetchEFund } from '@/app/services/authService'
import logo from "@assets/images/viloxLogo.png"
import Image from 'next/image';
import ChatChip from '@/app/components/organisms/ChatChip';

function Page({ params }) {
    const router = useRouter()
    const [amt, setAmt] = useState('')
    const [view, setView] = useState(false)
    const [loading, setLoading] = useState(true)
    const [EFundData, setEFund] = useState({})


    const fetch = async () => {
        const { status, data } = await fetchEFund().catch(err => console.log(err))
        if (status) {
            var newArray = data.data[0].filter(function (el) {
                return el.id.toString() === params.id.toString();
            });
            setEFund(...newArray)
        }
        setLoading(false)
    }


    const sellNow = async (e) => {
        e.preventDefault()
        setView(true)
    }



    useEffect(() => {
        fetch()
    }, [])


    return (
        <AppLayout title={`Sell Giftcard`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow flex">
                        <div onClick={() => view ? setView(false) : router.back()} className="cursor-pointer flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back
                        </div>
                    </div>
                </div>
                {
                    !loading && (
                        <div className="grid lg:grid-cols-3">
                            {
                                view ? (
                                    <div className="col-span-2 space-y-5 flex-col flex py-20 items-center justify-center w-full">
                                        <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 w-full"><ChatChip /></div>
                                    </div>
                                ) : (
                                    <div className="col-span-2 space-y-5 flex py-20 items-center justify-center w-full">

                                        <form enctype="multipart/form-data" onSubmit={sellNow} className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                            <div className="space-y-3">
                                                <div className="bg-gray-50 py-3 rounded-lg"><img src={EFundData.icon} className='bg-contain mx-auto' width={50} height={50} /></div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="space-y-3">
                                                    <div className="">Amount</div>
                                                    <div className="">
                                                        <AppInput onChange={(e) => setAmt(e.target.value)} required name='amount' label='Enter Amount' />
                                                    </div>
                                                </div>
                                                <div className="flex text-xs justify-between items-center">
                                                    <div className="">
                                                        {
                                                            parseInt(amt) > 0 && parseInt(amt) !== NaN && <div className="">Total: <span className='text-success'>&#8358;{Number(parseInt(amt) * (parseInt(amt) > 500 ? EFundData.sell_rate_high : EFundData.sell_rate_low)).toLocaleString('en-US')}</span></div>
                                                        }
                                                    </div>
                                                    <div className="">
                                                        {
                                                            Object?.keys(EFundData).length > 0 && <div className="">Rate: <span className='text-success'>&#8358;{Number(parseInt(amt) > 500 ? EFundData.sell_rate_high : EFundData.sell_rate_low).toLocaleString('en-US')}/$</span></div>
                                                        }

                                                    </div>
                                                </div>
                                                {
                                                    Object?.keys(EFundData).length > 0 && (
                                                        <div className="space-y-1">
                                                            <div className="flex text-xs justify-between items-center">
                                                                <div className="">10 - 500</div>
                                                                <div className="">Rate: <span className='text-success'>&#8358;{Number(EFundData.sell_rate_low).toLocaleString('en-US')}</span></div>
                                                            </div>
                                                            <div className="flex text-xs justify-between items-center">
                                                                <div className="">500 - Above</div>
                                                                <div className="">Rate: <span className='text-success'>&#8358;{Number(EFundData.sell_rate_high).toLocaleString('en-US')}</span></div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                            <div className="flex gap-3">
                                                <button className="flex-grow text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Request Tag</button>
                                            </div>
                                        </form>
                                    </div>
                                )
                            }

                        </div>
                    )
                }

                {
                    loading && (
                        <div className="flex justify-center">
                            <div className="lds-ellipsis *:bg-black relative bottom-8">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    )
                }

            </div>
        </AppLayout>
    )
}

export default Page