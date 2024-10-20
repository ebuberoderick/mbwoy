'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AppInput from '@/app/components/organisms/AppInput'
import Modal from '@/app/components/organisms/Modal'
import { RiUploadCloud2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import { MdOutlineFileCopy } from 'react-icons/md'
import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { fetchCryptos } from '@/app/services/authService'
import { API_BASE_URL, TOKEN } from '@/app/services/httpService'
import serialize from '@/app/hooks/Serialize'
import axios from 'axios'

function Page({ params }) {
    const router = useRouter()
    const [amt, setAmt] = useState('')
    const [confirmModal, setConfirmModal] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const [proccessing, setProcessing] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [view, setView] = useState(false)
    const [loading, setLoading] = useState(true)
    const [cryptos, setCrypto] = useState({})

    const headers = { 'Authorization': TOKEN }

    const fetch = async () => {
        const { status, data } = await fetchCryptos().catch(err => console.log(err))
        if (status) {
            var newArray = data.data[0].filter(function (el) {
                return el.id.toString() === params.id.toString();
            });
            setCrypto(...newArray)
        }
        setLoading(false)
    }


    const sellNow = async (e) => {
        e.preventDefault()
        setErrMsg('')
        !confirmModal ? setConfirmModal(true) : process(e)
    }

    const process = async (e) => {
        console.log(e);
        const data = serialize(e.target)
        const formdata = new FormData()
        setProcessing(true)

        formdata.append('card_id', data.card_id)
        formdata.append('amount', data.amount)
        formdata.append('rate', parseInt(data.amount) > 500 ? selected.sell_rate_high : selected.sell_rate_low)
        formdata.append('amount_to_pay', parseInt(data.amount) * (parseInt(data.amount) > 500 ? selected.sell_rate_high : selected.sell_rate_low))
        formdata.append('type', data.type)
        if (data.type === 'ecode') {
            formdata.append('ecode', data.ecode)
        } else {
            formdata.append('image', ...e.target[4].files)
        }

        console.log(formdata, data);


        await axios.post(`${API_BASE_URL}app/giftcard/sell`, formdata, { headers }).then(async (res) => {
            console.log(res);
            setCompleted(true)
        }).catch((error) => {
            setConfirmModal(false)
            setErrMsg(error?.response?.data?.message)
        })
        setProcessing(false)
    }


    useEffect(() => {
        fetch()
    }, [])


    return (
        <AppLayout title={`Sell Giftcard`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow flex">
                        <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back
                        </div>
                    </div>
                </div>
                {
                    !loading && (
                        <div className="grid lg:grid-cols-3">
                            {
                                view ? (
                                    <div className="col-span-2 space-y-5 flex py-20 items-center justify-center w-full">
                                        <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                            <img src={cryptos.icon} className='bg-contain' width={100} height={100} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-span-2 space-y-5 flex py-20 items-center justify-center w-full">
                                        {
                                            completed && (
                                                <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                                    <div className="font-extrabold text-2xl text-center"></div>
                                                    <div className="font-extrabold text-2xl text-center">Transaction Successful</div>
                                                    <div className="text-center text-sm">Transaction would take 10-15 minutes to process please be patient</div>
                                                    <div onClick={() => setView(true)} className="flex-grow cursor-pointer disabled:bg-opacity-35 w-full bg-black text-white rounded-3xl text-center py-3">View Transaction</div>
                                                </div>
                                            )
                                        }
                                        {
                                            !completed && (
                                                <form enctype="multipart/form-data" onSubmit={sellNow} className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                                    <div className="text-danger text-sm">{errMsg}</div>
                                                    <Modal isOpen={confirmModal} promt>
                                                        <div className="space-y-6">
                                                            <div className="space-y-1">
                                                                <div className="font-extrabold text-2xl text-center">Confirm Transaction</div>
                                                                <div className="text-center">Are you sure you want to proceed with this transaction?</div>
                                                            </div>
                                                            <div className="flex justify-center gap-4 px-3">
                                                                {!proccessing && <div onClick={() => setConfirmModal(false)} className="flex-grow cursor-pointer disabled:bg-opacity-35 border rounded-3xl text-center py-3">Cancel</div>}
                                                                <button disabled={proccessing} className="flex-grow transition-all duration-500 disabled:bg-opacity-35 bg-black text-white rounded-3xl text-center py-3">{proccessing ? "Proccessing..." : "Confirm"}</button>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                    <div className="space-y-3">
                                                        <div className="bg-gray-50 py-3 rounded-lg"><img src={cryptos.icon} className='bg-contain mx-auto' width={50} height={50} /></div>
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
                                                                    parseInt(amt) > 0 && parseInt(amt) !== NaN && <div className="">Total: <span className='text-success'>&#8358;{Number(parseInt(amt) * (parseInt(amt) > 500 ? cryptos.sell_rate_high : cryptos.sell_rate_low)).toLocaleString('en-US')}</span></div>
                                                                }
                                                            </div>
                                                            <div className="">
                                                                {
                                                                    Object?.keys(cryptos).length > 0 && <div className="">Rate: <span className='text-success'>&#8358;{Number(parseInt(amt) > 500 ? cryptos.sell_rate_high : cryptos.sell_rate_low).toLocaleString('en-US')}/$</span></div>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3 text-center text-xs text-gray-400">
                                                        Send Coins the wallet below  and upload receipt in the provided field below
                                                    </div>
                                                    <div className="w-52 h-52 bg-gray-100 mx-auto rounded-lg"></div>
                                                    <div className="w-full flex ">
                                                        <div className='text-gray-500 flex-grow bg-gray-100 w-full flex gap-5 items-center'>
                                                            <span >{cryptos.wallet_address}</span>
                                                            <span className='cursor-pointer bg-gray-100 w-6 h-6 text-xs flex rounded-full items-center justify-center' title='Click to Copy' onClick={() => navigator?.clipboard?.writeText(cryptos.wallet_address)}><MdOutlineFileCopy /></span>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="upload" className="relative w-full rounded-2xl text-hrms_green border border-hrms_green p-2 inline-block cursor-pointer">
                                                            <input id="upload" required name="images[]" multiple accept="image/png, image/gif, image/jpeg" type="file" className="opacity-0 absolute w-full cursor-pointer h-full" />
                                                            <div className="flex items-center w-full">
                                                                <div className="flex-grow text-gray-400">
                                                                    <div className="flex"><RiUploadCloud2Line /></div>
                                                                </div>
                                                                <div className=""><div className="flex-grow px-6 disabled:bg-opacity-35 shadow-md bg-black text-white text-xs rounded-xl text-center font-bold cursor-pointer py-2">Upload</div></div>
                                                            </div>
                                                        </label>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button className="flex-grow text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Confirm Transaction</button>
                                                    </div>
                                                </form>
                                            )
                                        }
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