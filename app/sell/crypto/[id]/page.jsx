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
import logo from "@assets/images/viloxLogo.png"
import success from "@assets/images/success.png"
import Image from 'next/image';
import QRCode from "react-qr-code";
import ChatChip from '@/app/components/organisms/ChatChip';
import Link from 'next/link';


function Page({ params }) {
    const router = useRouter()
    const [amt, setAmt] = useState('')
    const [confirmModal, setConfirmModal] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const [proccessing, setProcessing] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [transactionReceipt, setTransactionReceipt] = useState({})
    const [showChat, setShowChat] = useState(false)
    const [view, setView] = useState(false)
    const [loading, setLoading] = useState(true)
    const [uploadImg, setUploadImg] = useState([])
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
        await fetchx()
        setLoading(false)
    }

    const [crys, setCrys] = useState([])

    const fetchx = async () => {
        const { status, data } = await fetchCryptos().catch(err => console.log(err))
        if (status) {
            setCrys(data.data[0]);
        }
        setLoading(false)
    }


    const uploadUpdateImg = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadImg([e.target.files[0]])
        }
    }


    const sellNow = async (e) => {
        e.preventDefault()
        setErrMsg('')
        !confirmModal ? setConfirmModal(true) : process(e)
    }

    const process = async (e) => {
        const data = serialize(e.target)
        const images = uploadImg
        const formdata = new FormData()
        setProcessing(true)

        formdata.append('crypto_id', params.id)
        formdata.append('amount', data.amount)
        formdata.append('rate', parseInt(data.amount) > 500 ? cryptos.sell_rate_high : cryptos.sell_rate_low)
        formdata.append('amount_to_pay', parseInt(data.amount) * (parseInt(data.amount) > 500 ? cryptos.sell_rate_high : cryptos.sell_rate_low))
        for (let index = 0; index < images.length; index++) {
            formdata.append(`images[]`, images[index])
        }

        await axios.post(`${API_BASE_URL}app/crypto/sell`, formdata, { headers }).then(async (res) => {
            setTransactionReceipt(res.data.data[0]);
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
                                                    <Image src={logo} className="w-20 mx-auto" alt="LOGO" />
                                                    <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                                        <div className="space-y-3">
                                                            <div className="bg-gray-50 py-3 rounded-lg"><img src={cryptos.icon} className='bg-contain mx-auto' width={50} height={50} /></div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="">Crypto</div>
                                                            <div className="font-bold text-lg">{cryptos.name}</div>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div className="">Transaction Ref</div>
                                                            <div className="font-bold text-lg capitalize">{transactionReceipt?.transaction_id}</div>
                                                        </div>
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
                                                    <div className="w-52 h-52 bg-gray-100 mx-auto rounded-lg">
                                                        <QRCode value={cryptos.wallet_address} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} viewBox={`0 0 256 256`} />
                                                    </div>
                                                    <div title='Click to Copy' onClick={() => navigator?.clipboard?.writeText(cryptos.wallet_address)} className="bg-gray-100 pl-1 relative pr-8 rounded-xl">
                                                        <div className="max-w-sm trunck-text space-x-3 p-2 rounded-lg">
                                                            <div className="max-w-[18rem] inline-block flex-grow">
                                                                <div className="trunck-text relative top-1">{cryptos.wallet_address}</div>
                                                            </div>
                                                            <div className="opacity-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni officia quasi nulla odit corporis aliquid? Error reprehenderit nostrum iste laudantium quibusdam tenetur ipsa alias, numquam, voluptates sit soluta, quod corporis?</div>
                                                            <div className="inline-block w-5 h-5 absolute bottom-7 top-4 right-2"><MdOutlineFileCopy /></div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="upload" className="relative w-full rounded-2xl text-hrms_green border border-hrms_green p-2 inline-block cursor-pointer">
                                                            <input id="upload" required name="images[]" onChange={(e) => uploadUpdateImg(e)} accept="image/png, image/gif, image/jpeg" type="file" className="opacity-0 absolute w-full cursor-pointer h-full" />
                                                            <div className="flex items-center w-full">
                                                                <div className="flex-grow text-gray-400">
                                                                    <div className="flex items-center gap-2"><RiUploadCloud2Line /> <div className="w-52 truncate">{!uploadImg[0]?.name ? "Upload Receipt" : uploadImg[0]?.name}</div></div>
                                                                </div>
                                                                <div className=""><div className="flex-grow px-6 disabled:bg-opacity-35 shadow-md bg-black text-white text-xs rounded-xl text-center font-bold cursor-pointer py-2">Upload</div></div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    {
                                                        Object?.keys(cryptos).length > 0 && (
                                                            <div className="space-y-1">
                                                                <div className="flex text-xs justify-between items-center">
                                                                    <div className="">10 - 500</div>
                                                                    <div className="">Rate: <span className='text-success'>&#8358;{Number(cryptos.sell_rate_low).toLocaleString('en-US')}</span></div>
                                                                </div>
                                                                <div className="flex text-xs justify-between items-center">
                                                                    <div className="">500 - Above</div>
                                                                    <div className="">Rate: <span className='text-success'>&#8358;{Number(cryptos.sell_rate_high).toLocaleString('en-US')}</span></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

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
                                        crys.map((data, i) => (
                                            parseInt(data.id) !== parseInt(params.id) && (
                                                <Link href={`${data.id}`} key={i} className="py-3 space-y-1 cursor-pointer border rounded-xl">
                                                    <div className="sm:w-16 w-10 sm:h-16 h-10 mx-auto">
                                                        <img src={data.icon} className='bg-contain' width={100} height={100} />
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

            </div>
        </AppLayout>
    )
}

export default Page