'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AddBankModal from '@/app/components/molecules/AddBankModal'
import AppInput from '@/app/components/organisms/AppInput'
import Modal from '@/app/components/organisms/Modal'
import { fetchBanks } from '@/app/services/authService'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

function Page() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [addAccountModal, updateAddAccountModal] = useState(false)
    const [proccessing, setProccessing] = useState(false)
    const [bankList, setBankList] = useState([])

    const fetch = async () => {
        const { status, data } = await fetchBanks().catch(err => console.log(err))
        if (status) {
            setBankList(data.data[0]);
        }
        setLoading(false)
    }

    const withdrawNw = async (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <AppLayout title={`Withdrawal`}>
            <AddBankModal close={() => updateAddAccountModal(false)} isOpen={addAccountModal} />
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
                                            {
                                                bankList.map((data, i) => (
                                                    <div key={i} className='flex items-center gap-3 border border-gray-300 rounded-lg p-3'>
                                                        <div className='bg-white shadow-md h-10 w-10 sm:h-14 sm:w-14 rounded-full flex items-center justify-center'></div>
                                                        <div>
                                                            <div className='font-semibold text-sm sm:text-base'>Onyemzoro Ebube Roderick</div>
                                                            <div className='flex items-center text-xs sm:text-sm gap-1'>
                                                                <div>8130075358</div>
                                                                <div className='w-1 h-1 rounded-full bg-black'></div>
                                                                <div>OPay</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className="">
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