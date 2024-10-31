'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AppInput from '@/app/components/organisms/AppInput'
import Modal from '@/app/components/organisms/Modal'
import { RiUploadCloud2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundBack, IoMdClose } from 'react-icons/io'
import { fetchGiftcard, fetchGiftcards } from '@/app/services/authService'
import { API_BASE_URL, TOKEN } from '@/app/services/httpService'
import serialize from '@/app/hooks/Serialize'
import axios from 'axios'
import logo from "@assets/images/viloxLogo.png"
import success from "@assets/images/success.png"
import Image from 'next/image';
import ChatChip from '@/app/components/organisms/ChatChip';
import Link from 'next/link';


function Page({ params }) {
    const router = useRouter()
    const [type, updateType] = useState('')
    const [amt, setAmt] = useState('')
    const [confirmModal, setConfirmModal] = useState(false)
    const [showChat, setShowChat] = useState(false)
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
    const [uploadImg, setUploadImg] = useState([])
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
        await fetchx()
        setLoading(false)
    }

    const [giftcard, setGifcard] = useState([])

    const fetchx = async () => {
        const { status, data } = await fetchGiftcards().catch(err => console.log(err))
        if (status) {
            setGifcard(data.data[0]);
        }
        setLoading(false)
    }



    const sellNow = async (e) => {
        e.preventDefault()
        setErrMsg('')
        !confirmModal ? setConfirmModal(true) : process(e)
    }



    const uploadUpdateImg = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadImg(prev => [...prev, ...e.target.files])
        }
    }

    const removeImg = (e) => {

        var arr = uploadImg
        var index = arr.indexOf(e);
        if (index > -1) {
            arr.splice(index, 1);
        }

        setUploadImg([...arr])
    }


    const process = async (e) => {
        const images = uploadImg
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
                        <div onClick={() => showChat ? setShowChat(false) : router.back()} className="cursor-pointer flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back
                        </div>
                    </div>
                </div>
                {
                    !loading && (
                        <div className="grid lg:grid-cols-2">
                            {
                                view ? (
                                    <div className="space-y-5 flex-col flex py-20 items-center justify-center w-full">
                                        {
                                            showChat ? (
                                                <div className="space-y-5 flex-col flex py-20 items-center justify-center w-full">
                                                    <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 w-full"><ChatChip /></div>
                                                </div>
                                            ) : (
                                                <div className="space-y-5 flex-col flex py-20 items-center justify-center w-full">
                                                    <Image src={logo} draggable={false} className="pointer-events-none w-20 mx-auto" alt="LOGO" />
                                                    <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                                        <div className="space-y-3">
                                                            <div className="bg-gray-50 py-3 rounded-lg"><img src={cardDetail.image} draggable={false} className=' pointer-events-none bg-contain mx-auto' width={50} height={50} /></div>
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
                                                                                    <img src={data} alt="" draggable={false} className="pointer-events-none w-full h-full" srcset="" />
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
                                                        <div onClick={() => setShowChat(true)} className="flex-grow text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Report issue</div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <div className="space-y-5 flex py-20 items-center justify-center w-full">
                                        {
                                            completed && (
                                                <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                                    <div className="font-extrabold text-2xl text-center">
                                                        <Image src={success} draggable={false} className="pointer-events-none' mx-auto h-64" alt="" />
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
                                                        <div className="bg-gray-50 py-3 rounded-lg"><img src={cardDetail.image} draggable={false} className=' pointer-events-none bg-contain mx-auto' width={50} height={50} /></div>
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
                                                            <div className="space-y-3">
                                                                <div className="">
                                                                    <label htmlFor="upload" className="relative space-y-5 w-full rounded-2xl text-hrms_green border border-hrms_green py-3 px-4 inline-block cursor-pointer">
                                                                        <input id="upload" required name="images[]" onChange={(e) => uploadUpdateImg(e)} multiple accept="image/png, image/gif, image/jpeg" type="file" className="opacity-0 absolute w-full cursor-pointer h-full" />
                                                                        <div className="text-center w-full">
                                                                            <div className="text-[150px] flex justify-center"><RiUploadCloud2Line /></div>
                                                                            <div className="text-xs text-center px-8">Click and upload Front and Back of Card, Must not be more than 10mb</div>
                                                                        </div>
                                                                        <div className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white  rounded-xl text-center font-bold cursor-pointer py-3">Upload</div>
                                                                    </label>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    {
                                                                        uploadImg.map((img, i) => (
                                                                            <div key={i} className="flex gap-2 items-center">
                                                                                <div className="">
                                                                                    <div className="w-12 h-12 rounded-sm">
                                                                                        <Image
                                                                                            src={URL.createObjectURL(img)}
                                                                                            alt={img.name}
                                                                                            draggable={false}
                                                                                            className="pointer-events-none w-full h-full"
                                                                                            width={'150'}
                                                                                            height={'150'}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-grow space-y-1">
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="text-xs w-52 truncate">{img.name}</div>
                                                                                        <div className="text-xs">{Math.round(((img.size / 1024) * 10) / 10) > 1023 ? Math.round((((img.size / 1024) / 1024) * 10) / 10) : Math.round(((img.size / 1024) * 10) / 10)} {Math.round(((img.size / 1024) * 10) / 10) > 1024 ? "mb" : "kb"}</div>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        <div className="bg-black py-1 rounded-full"></div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cursor-pointer p-2" onClick={() => removeImg(img)}>
                                                                                    <IoMdClose />
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
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
                                                        {
                                                            Object?.keys(selected).length > 0 && (
                                                                <div className="space-y-1">
                                                                    <div className="flex text-xs justify-between items-center">
                                                                        <div className="">10 - 500</div>
                                                                        <div className="">Rate: <span className='text-success'>&#8358;{Number(selected.sell_rate_low).toLocaleString('en-US')}</span></div>
                                                                    </div>
                                                                    <div className="flex text-xs justify-between items-center">
                                                                        <div className="">500 - Above</div>
                                                                        <div className="">Rate: <span className='text-success'>&#8358;{Number(selected.sell_rate_high).toLocaleString('en-US')}</span></div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
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
                            <div className="">
                                <div className="lg:grid hidden grid-cols-2 xl:grid-cols-3 gap-5">
                                    {
                                        giftcard.map((data, i) => (
                                            parseInt(data.id) !== parseInt(params.id) && (
                                                <Link href={`${data.id}`} key={i} className="py-3 space-y-1 cursor-pointer border rounded-xl">
                                                    <div className="sm:w-16 w-10 sm:h-16 h-10 mx-auto">
                                                        <img src={data.image} draggable={false} className=' pointer-events-none bg-contain' width={100} height={100} />
                                                    </div>
                                                    <div className="font-bold sm:text-xl text-center">{data.name}</div>
                                                </Link>
                                            )
                                        ))
                                    }
                                </div>
                            </div>
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