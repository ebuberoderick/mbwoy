'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AddBankModal from '@/app/components/molecules/AddBankModal'
import AppInput from '@/app/components/organisms/AppInput'
import Modal from '@/app/components/organisms/Modal'
import { fetchBanks, withdraw } from '@/app/services/authService'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import success from "@assets/images/success.png"
import OtpInput from 'react-otp-input';
import { PiBankDuotone } from 'react-icons/pi'
import serialize from '@/app/hooks/Serialize'
import Image from 'next/image'

function Page() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [addAccountModal, updateAddAccountModal] = useState(false)
    const [proccessing, setProccessing] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [bankList, setBankList] = useState([])
    const [pin, setPin] = useState('');
    const [errMsg, setErrMsg] = useState("")
    const [amtErr, setAmtErr] = useState("")

    const fetch = async () => {
        setLoading(true)
        setBankList([])
        const { status, data } = await fetchBanks().catch(err => console.log(err))
        if (status) {
            setBankList(data.data[0]);
        }
        setLoading(false)
    }

    const withdrawNw = async (e) => {
        e.preventDefault()
        setAmtErr("")
        const x = serialize(e.target)
        if (x.amount > 999) {
            !confirmModal ? setConfirmModal(true) : FN(x)
        } else {
            setAmtErr("Minimum withdrawal amount is N1,000")
        }
    }

    const FN = async (x) => {
        setProccessing(true)
        x.pin = pin
        setErrMsg("")
        if (x.pin.length === 4) {
            const { status, data } = await withdraw(x).catch(err => console.log(err))
            if (status) {
                setCompleted(true)
            } else {
                setErrMsg(data?.message)
            }
        }
        setProccessing(false)

    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <AppLayout title={`Withdrawal`}>
            <AddBankModal refresh={() => fetch()} close={() => updateAddAccountModal(false)} isOpen={addAccountModal} />
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow items-center flex">
                        <div className="flex-grow">
                            <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                                <IoIosArrowRoundBack /> Back
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3">
                    <div className="col-span-2 space-y-5 flex-col flex py-20 items-center justify-center w-full">
                        <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                            {
                                !loading && (
                                    <div className="space-y-7">
                                        <div className="space-y-5">
                                            {bankList.length === 0 && <div className="text-sm text-gray-400 text-center">You have not added any bank for withdrawal</div>}
                                            <div className="px-4 md:px-0">
                                                <div onClick={() => updateAddAccountModal(true)} className="bg-black text-center cursor-pointer w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
                                                    Add New Account
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={withdrawNw} className="space-y-4">
                                            <Modal isOpen={confirmModal} closeModal={() => { setConfirmModal(false); setCompleted(false); setPin("") }} promt={proccessing}>
                                                {
                                                    completed ? (
                                                        <div className="max-w-sm rounded-2xl space-y-4 p-4 py-10 w-full">
                                                            <div className="font-extrabold text-2xl text-center">
                                                                <Image src={success} className="mx-auto h-64" alt="" />
                                                            </div>
                                                            <div className="font-extrabold text-2xl text-center">Transaction Successful</div>
                                                            <div className="text-center text-sm">Transaction would take 10-15 minutes to process please be patient</div>
                                                            <div onClick={() => router.back()} className="flex-grow cursor-pointer disabled:bg-opacity-35 w-full bg-black text-white rounded-3xl text-center py-3">Close</div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6">
                                                            <div className="space-y-1">
                                                                <div className="font-extrabold text-2xl text-center">Enter Transaction PIN</div>
                                                                <div className="text-center">Comfirm transaction with your 4 digit PIN</div>
                                                                <div className="text-center text-danger text-xs">{errMsg}</div>
                                                            </div>
                                                            <div className="justify-center flex *:gap-4">
                                                                <OtpInput
                                                                    value={pin}
                                                                    onChange={setPin}
                                                                    numInputs={4}
                                                                    isInputNum={true}
                                                                    shouldAutoFocus={true}
                                                                    inputType='tel'
                                                                    inputStyle={{
                                                                        border: "1px solid transparent",
                                                                        borderRadius: "8px",
                                                                        appearance: "none",
                                                                        width: "54px",
                                                                        height: "54px",
                                                                        fontSize: "18px",
                                                                        color: "#000",
                                                                        fontWeight: "400",
                                                                        caretColor: "gray",
                                                                        outline: "none",
                                                                        background: "#f3f4f6"
                                                                    }}
                                                                    focusStyle={'outline-none ring-0 border border-gray-400'}
                                                                    renderInput={(props) => <input {...props} />}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center gap-4 px-3">
                                                                <button disabled={proccessing} className="flex-grow transition-all duration-500 disabled:bg-opacity-35 bg-black text-white rounded-3xl text-center py-3">{proccessing ? "Proccessing..." : "Confirm"}</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </Modal>
                                            {
                                                bankList.map((data, i) => (
                                                    <label key={i} className='has-[:checked]:bg-gray-50 has-[:checked]:border-gray-800 cursor-pointer flex items-center gap-3 border border-gray-300 rounded-lg p-3'>
                                                        <input type="radio" value={data.id} name="bank_id" required class="opacity-0 absolute" />
                                                        <div className="">
                                                            <div className='bg-white shadow-md h-10 w-10 sm:h-14 sm:w-14 rounded-full flex items-center justify-center'>
                                                                <PiBankDuotone />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='font-semibold text-sm sm:text-base'>{data.account_name}</div>
                                                            <div className='flex flex-wrap items-center text-xs sm:text-sm gap-1'>
                                                                <div>{data.account_number}</div>
                                                                <div className='w-1 h-1 rounded-full bg-black'></div>
                                                                <div>{data.bank_name}</div>
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))
                                            }
                                            <div className="">
                                                <div className="text-center text-danger text-xs">{amtErr}</div>
                                                <div className="space-y-3">
                                                    <div className="">Email Amount</div>
                                                    <AppInput required label='Enter Amount' name='amount' />
                                                </div>
                                                <div className="text-xs">Minimum:&#8358;1k</div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex gap-3">
                                                    <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Withdraw"}</button>
                                                </div>
                                            </div>
                                        </form>
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
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Page