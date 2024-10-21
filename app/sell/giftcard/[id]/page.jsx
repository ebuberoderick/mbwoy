'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AppInput from '@/app/components/organisms/AppInput'
import Modal from '@/app/components/organisms/Modal'
import { RiUploadCloud2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { fetchGiftcard } from '@/app/services/authService'
import { API_BASE_URL, TOKEN } from '@/app/services/httpService'
import serialize from '@/app/hooks/Serialize'
import axios from 'axios'
import logo from "@assets/images/viloxLogo.png"
import success from "@assets/images/success.png"
import Image from 'next/image';


function Page({ params }) {
    const router = useRouter()
    const [type, updateType] = useState('')
    const [amt, setAmt] = useState('')
    const [confirmModal, setConfirmModal] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const [proccessing, setProcessing] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [view, setView] = useState(false)
    const [loading, setLoading] = useState(true)
    const [transactionReceipt, setTransactionReceipt] = useState({})
    const [cardDetail, setCardDetail] = useState({})
    const [selected, setSelected] = useState({})
    const [options, setOptions] = useState([])
    const [cardOptions, setCardOptions] = useState([])

    const headers = { 'Authorization': TOKEN }

    const fetch = async () => {
        const { status, data } = await fetchGiftcard({ id: params.id }).catch(err => console.log(err))
        if (status) {
            setCardDetail(data.data[0]);
            setCardOptions(data.data[0].giftcard)
            let list = []
            data.data[0].giftcard.forEach(element => {
                list.push({ value: element.id, label: element.name })
            });
            setOptions(list)
        }
        setLoading(false)
    }


    const sellNow = async (e) => {
        e.preventDefault()
        setErrMsg('')
        !confirmModal ? setConfirmModal(true) : process(e)
    }

    const process = async (e) => {
        const images = e.target[4].files
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
            for (let index = 0; index < images.length; index++) {
                formdata.append(`images[]`, images[index])
            }
        }

        await axios.post(`${API_BASE_URL}app/giftcard/sell`, formdata, { headers }).then(async (res) => {
            setTransactionReceipt(res.data.data[0]);
            setCompleted(true)
        }).catch((error) => {
            setConfirmModal(false)
            setErrMsg(error?.response?.data?.message)
        })
        setProcessing(false)
    }


    const x = (i) => {
        var newArray = cardOptions.filter(function (el) {
            return el.id.toString() === i.toString();
        });
        setSelected(...newArray)
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
                                    <div className="col-span-2 space-y-5 flex-col flex py-20 items-center justify-center w-full">
                                        <Image src={logo} className="w-20 mx-auto" alt="LOGO" />
                                        <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                            <div className="space-y-3">
                                                <div className="bg-gray-50 py-3 rounded-lg"><img src={cardDetail.image} className='bg-contain mx-auto' width={50} height={50} /></div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="">Country</div>
                                                <div className="font-bold text-lg">{selected.name}</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="">Card Type</div>
                                                <div className="font-bold text-lg capitalize">{transactionReceipt?.type}</div>
                                            </div>
                                            {
                                                transactionReceipt?.type === `physical` ? (
                                                    <div className="flex items-center justify-between">
                                                        <div className="">Uploads</div>
                                                        <div className="font-bold flex gap-2 text-lg">
                                                            {
                                                                transactionReceipt?.images.map((data, i) => (
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
                                                        <div className="font-bold text-lg">{transactionReceipt?.ecode}</div>
                                                    </div>
                                                )
                                            }
                                            <div className="flex items-center justify-between">
                                                <div className="">Rate</div>
                                                <div className="font-bold text-lg">${Number(transactionReceipt?.rate).toLocaleString('en-US')}</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="">Amount</div>
                                                <div className="font-bold text-lg">${Number(transactionReceipt?.amount).toLocaleString('en-US')}</div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="">Payment in Naira</div>
                                                <div className="font-bold text-lg">&#8358;{Number(transactionReceipt?.amount_to_pay).toLocaleString('en-US')}</div>
                                            </div>
                                            <div className="flex-grow text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Report issue</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="col-span-2 space-y-5 flex py-20 items-center justify-center w-full">
                                        {
                                            completed && (
                                                <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                                    <div className="font-extrabold text-2xl text-center">
                                                        <Image src={success} className="mx-auto h-64" alt="" />
                                                    </div>
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
                                                        <div className="bg-gray-50 py-3 rounded-lg"><img src={cardDetail.image} className='bg-contain mx-auto' width={50} height={50} /></div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="">Country</div>
                                                        <AppInput type={'select'} required label='select country' name='card_id' onChange={e => x(e.target.value)} options={[...options]} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="">Choose Card Type</div>
                                                        <div className="flex gap-3">
                                                            <label checked className="has-[:checked]:bg-black has-[:checked]:text-white cursor-pointer rounded-2xl border border-gray-100 has-[:checked]:border-0">
                                                                <input required type="radio" name="type" value='physical' onChange={e => updateType(e.target.value)} className="opacity-0 absolute" />
                                                                <div className="py-3 px-5 space-y-3">
                                                                    Physical
                                                                </div>
                                                            </label>
                                                            <label checked className="has-[:checked]:bg-black has-[:checked]:text-white cursor-pointer rounded-2xl border border-gray-100 has-[:checked]:border-0">
                                                                <input required type="radio" name="type" value='ecode' onChange={e => updateType(e.target.value)} className="opacity-0 absolute" />
                                                                <div className="py-3 px-5 space-y-3">
                                                                    E-code
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {
                                                        type === 'physical' && (
                                                            <div className="">
                                                                <label htmlFor="upload" className="relative space-y-5 w-full rounded-2xl text-hrms_green border border-hrms_green py-3 px-4 inline-block cursor-pointer">
                                                                    <input id="upload" required name="images[]" multiple accept="image/png, image/gif, image/jpeg" type="file" className="opacity-0 absolute w-full cursor-pointer h-full" />
                                                                    <div className="text-center w-full">
                                                                        <div className="text-[150px] flex justify-center"><RiUploadCloud2Line /></div>
                                                                        <div className="text-xs text-center px-8">Click and upload Front and Back of Card, Must not be more than 10mb</div>
                                                                    </div>
                                                                    <div className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white  rounded-xl text-center font-bold cursor-pointer py-3">Upload</div>
                                                                </label>
                                                            </div>
                                                        )
                                                    }

                                                    {
                                                        type === 'ecode' && (
                                                            <div className="space-y-3">
                                                                <div className="">E-code</div>
                                                                <div className="">
                                                                    <AppInput required name='ecode' label='Enter Code' />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
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
                                                                    parseInt(amt) > 0 && parseInt(amt) !== NaN && <div className="">Total: <span className='text-success'>&#8358;{Number(parseInt(amt) * (parseInt(amt) > 500 ? selected.sell_rate_high : selected.sell_rate_low)).toLocaleString('en-US')}</span></div>
                                                                }

                                                            </div>
                                                            <div className="">
                                                                {
                                                                    Object?.keys(selected).length > 0 && <div className="">Rate: <span className='text-success'>&#8358;{Number(parseInt(amt) > 500 ? selected.sell_rate_high : selected.sell_rate_low).toLocaleString('en-US')}/$</span></div>
                                                                }

                                                            </div>
                                                        </div>
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

            </div >
        </AppLayout >
    )
}

export default Page