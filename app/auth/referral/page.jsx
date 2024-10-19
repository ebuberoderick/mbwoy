'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayoutX from '@/app/components/layouts/authLayoutX'
import { verifyReferral } from '@/app/services/authService'
import AppInput from '@/app/components/organisms/AppInput';
import Link from 'next/link'

function Page() {
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()


    const confirmOTP = async (e) => {
        setProccessing(true)
        const { status, data } = await verifyReferral(e).catch(err => console.log(err))
        setProccessing(false)
        if (status) {
            setErrMsg('')
            router.push("/")
        } else {
            setErrMsg(data.message)
        }
    }


    return (
        <AuthLayoutX errMsg={errMsg} onSubmit={(e) => confirmOTP(e)} title={"Referral Code"} subText={"Please fill in your details"}>
            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="">Referral Code</div>
                    <AppInput required label='Enter Referral Code' name='code' />
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Submit"}</button>
                    </div>
                </div>
                <div className="">
                    <Link href='/'>
                        <div className="text-center py-2">Skip</div>
                    </Link>
                </div>
            </div>
        </AuthLayoutX>
    )
}

export default Page