'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import AppInput from '@/app/components/organisms/AppInput'
import Modal from '@/app/components/organisms/Modal'
import Link from 'next/link'
import { RiUploadCloud2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'

function Page({ params }) {
    const router = useRouter()
    const [type, updateType] = useState('')
    const [confirmModal, setConfirmModal] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [view, setView] = useState(false)



    return (
        <AppLayout title={`Sell Crypto`}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <div className="flex-grow flex">
                        <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                            <IoIosArrowRoundBack /> Back
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3">
                    {
                        view ? (
                            <div className="col-span-2 space-y-5 flex py-20 items-center justify-center w-full">
                                <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">

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
                                            <div onClick={()=> setView(true)} className="flex-grow cursor-pointer disabled:bg-opacity-35 w-full bg-black text-white rounded-3xl text-center py-3">View Transaction</div>
                                        </div>
                                    )
                                }
                                {
                                    !completed && (
                                        <div className="max-w-sm sm:shadow-lg rounded-2xl space-y-4 p-4 py-10 w-full">
                                            <Modal isOpen={confirmModal} promt>
                                                <div className="space-y-6">
                                                    <div className="space-y-1">
                                                        <div className="font-extrabold text-2xl text-center">Confirm Transaction</div>
                                                        <div className="text-center">Are you sure you want to proceed with this transaction?</div>
                                                    </div>
                                                    <div className="flex justify-center gap-4 px-3">
                                                        <div onClick={() => setConfirmModal(false)} className="flex-grow cursor-pointer disabled:bg-opacity-35 border rounded-3xl text-center py-3">Cancel</div>
                                                        <button onClick={() => setCompleted(true)} className="flex-grow disabled:bg-opacity-35 bg-black text-white rounded-3xl text-center py-3">Confirm</button>
                                                    </div>
                                                </div>
                                            </Modal>
                                            <div className="space-y-3">
                                                <div className="bg-gray-50 py-7 rounded-lg"></div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="">Country</div>
                                                <AppInput type={'select'} label='select country' options={[{ value: '', label: '' }]} />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="">Choose Card Type</div>
                                                <div className="flex gap-3">
                                                    <label checked class="has-[:checked]:bg-black has-[:checked]:text-white cursor-pointer rounded-2xl border border-gray-100 has-[:checked]:border-0">
                                                        <input type="radio" name="type" value='physical' onChange={e => updateType(e.target.value)} class="hidden absolute" />
                                                        <div className="py-3 px-5 space-y-3">
                                                            Physical
                                                        </div>
                                                    </label>
                                                    <label checked class="has-[:checked]:bg-black has-[:checked]:text-white cursor-pointer rounded-2xl border border-gray-100 has-[:checked]:border-0">
                                                        <input type="radio" name="type" value='ecode' onChange={e => updateType(e.target.value)} class="hidden absolute" />
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
                                                            <input id="upload" name="csv_file" multiple accept="image/png, image/gif, image/jpeg" type="file" className="opacity-0 absolute w-full cursor-pointer h-full" />
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
                                                            <AppInput label='Enter Amount' />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            <div className="space-y-3">
                                                <div className="">Amount</div>
                                                <div className="">
                                                    <AppInput label='Enter Amount' />
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <div onClick={() => setConfirmModal(true)} className="flex-grow text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Confirm Transaction</div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }

                </div>
            </div>
        </AppLayout>
    )
}

export default Page