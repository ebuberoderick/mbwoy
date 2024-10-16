"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { LiaEye } from 'react-icons/lia';
import Modal from './Modal';
import AppInput from './AppInput';
import { updateCrypto } from '@/app/services/authService';
import serialize from '@/app/hooks/Serialize';
import ResponseModal from './ResponseModal';
import { AiOutlineLoading } from 'react-icons/ai';
import { CiCreditCard1, CiCreditCardOff } from 'react-icons/ci';

function CryptoChip({ data , reload }) {
    const [showModal, setShowModal] = useState(false)
    const val = Number(data.sell_rate_low)
    const val2 = Number(data.sell_rate_high)
    const fee = Number(data.fee)
    const [showForm, setShowForm] = useState(false)
    const [alertMsg, setAlert] = useState(false)
    const [alertMsgData, setAlertData] = useState(false)
    const [processing, setProcessing] = useState(false)
    
    const updateCoin = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const formData = new FormData();
        formData.append("key", serialize(e.target))
        const { status, data } = await updateCrypto(serialize(e.target)).catch(err => {console.log(err),setProcessing(false)})
        if (status) {

        }
        await reload()
        setProcessing(false)
        setAlert(true)
        setAlertData(data)
    }

    return (
        <>
            <div className="px-4 py-4 space-y-4 border border-gray-200 rounded-md bg-white">
                <div className="">
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="w-12 h-12 overflow-hidden rounded-full"><img src={data.icon} width={100} height={100} /></div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div onClick={() => setShowModal(true)} className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer'><LiaEye /></div>
                            <div>
                                {
                                    processing ? (
                                        <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer'>
                                            <AiOutlineLoading className='animate-spin' />
                                        </div>
                                    ) : (
                                        <form onSubmit={(e) => updateCoin(e)} enctype="multipart/form-data">
                                            <div className='space-y-5'>
                                                <button title={data.status === "active" ? "Click to deactivate" : "Click to activate"} className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer'>
                                                    {
                                                        data.status === "active" ? <CiCreditCard1 /> : <CiCreditCardOff />
                                                    }
                                                </button>
                                                <input type='hidden' name='id' value={data.id} />
                                                <input type='hidden' name='status' value={data.status === "active" ? "inactive" : "active"} />
                                                <input type='hidden' defaultValue={data.name} name="name" required label="Name" />
                                                <input type='hidden' defaultValue={data.symbol} name="symbol" required label="Symbol " />
                                                <input type='hidden' defaultValue={data.network} name="network" required label="Network " />
                                                <input type='hidden' defaultValue={data.sell_rate_low} name="sell_rate_low" required label="Sell rate low " />
                                                <input type='hidden' defaultValue={data.sell_rate_high} name="sell_rate_high" required label="Sell rate high " />
                                                <input type='hidden' defaultValue={data.wallet_address} name="wallet_address" required label="Wallet address " />
                                            </div>
                                        </form>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-xl uppercase font-bold">{data.symbol}</div>
                        <div className='text-xs text-gray-500'>{data.name} ({data.network})</div>
                        <div className={`inline-block ${data.status === "active" ? "bg-success text-success" : "bg-danger text-danger"} bg-opacity-10 px-6 text-xs rounded-3xl py-1`}>
                            {data.status}
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className='grid grid-cols-2'>
                        <div className=''>
                            <div className='font-bold'>Sell rate low:</div>
                            <div className='text-gray-500'>&#8358;{val.toLocaleString('en-US')}</div>
                        </div>
                        <div className=''>
                            <div className='font-bold'>Sell rate high:</div>
                            <div className='text-gray-500'>&#8358;{val2.toLocaleString('en-US')}</div>
                        </div>
                    </div>

                    <div className=''>
                        <div className='font-bold'>Wallet Address</div>
                        <div className='text-gray-500 trunck-text'>{data.wallet_address}</div>
                    </div>
                </div>
            </div>
            <Modal closeModal={() => { setShowModal(false); setShowForm(false) }} size={"lg"} isOpen={showModal}>
                <form onSubmit={(e) => updateCoin(e)} enctype="multipart/form-data">
                    {
                        showForm ? (
                            <div className='space-y-5'>
                                <input type='hidden' name='id' value={data.id} />
                                <input type='hidden' name='status' value={data.status} />
                                <AppInput defaultValue={data.name} name="name" required label="Name" />
                                <AppInput defaultValue={data.symbol} name="symbol" required label="Symbol " />
                                <AppInput defaultValue={data.network} name="network" required label="Network " />
                                <AppInput defaultValue={data.sell_rate_low} name="sell_rate_low" required label="Sell rate low " />
                                <AppInput defaultValue={data.sell_rate_high} name="sell_rate_high" required label="Sell rate high " />
                                <AppInput defaultValue={data.wallet_address} name="wallet_address" required label="Wallet address " />
                                <div className='flex gap-4 items-center'>
                                    <button className='bg-black text-white text-center flex-grow rounded-md py-2'>Confirm</button>
                                    <div onClick={() => { setShowModal(false); setShowForm(false) }} className='hover:bg-gray-50 text-center flex-grow rounded-md py-2 cursor-pointer'>Cancel</div>
                                </div>
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                <div className="">
                                    <div className="flex items-start">
                                        <div className="flex-grow">
                                            <div className="w-12 h-12 rounded-full"><img src={data.icon} width={100} height={100} /></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xl uppercase font-bold">{data.symbol}</div>
                                        <div className='text-xs text-gray-500'>{data.name} ({data.network})</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className='grid grid-cols-2'>
                                        <div className=''>
                                            <div className='font-bold'>Sell rate low:</div>
                                            <div className='text-gray-500'>&#8358;{val.toLocaleString('en-US')}</div>
                                        </div>
                                        <div className=''>
                                            <div className='font-bold'>Sell rate high:</div>
                                            <div className='text-gray-500'>&#8358;{val2.toLocaleString('en-US')}</div>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <div className='font-bold'>Wallet Address</div>
                                        <div className='text-gray-500'>{data.wallet_address}</div>
                                    </div>
                                    <div className=''>
                                        <div className='font-bold'>Fee</div>
                                        <div className='text-gray-500'>&#8358;{fee.toLocaleString('en-US')}</div>
                                    </div>

                                    <div className=''>
                                        <div className='font-bold'>Buy Rate</div>
                                        <div className='text-gray-500'>{data.buy_rate_low}</div>
                                    </div>
                                </div>
                                <div onClick={() => setShowForm(true)} className='bg-black py-2 rounded-md cursor-pointer text-white text-center'>Update</div>
                            </div>
                        )
                    }
                </form>
            </Modal>
            <ResponseModal
                status={alertMsgData?.success}
                isOpen={alertMsg}
                onClose={() => setAlert(false)}
                message={alertMsgData?.message}
            />
        </>
    )
}

export default CryptoChip