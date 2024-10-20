'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/app/components/layouts/authLayout'
import { sendOTP } from '@/app/services/authService'
import AppInput from '@/app/components/organisms/AppInput';
import Link from 'next/link'

function Page() {
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()


    const sendMail = async (e) => {
        setProccessing(true)
        const { status, data } = await sendOTP(e).catch(err => console.log(err))
        setProccessing(false)
        if (status) {
            setErrMsg('')
            router.push(`forgotten-password/otp?em=${e.email}&uid=${62345}`)
        } else {
            setErrMsg(data.message)
        }
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => sendMail(e)} title={"Forgotten Password"} subText={"Please fill in your details"}>
            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="">Email Address</div>
                    <AppInput required label='Enter Email Address' name='email' />
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Submit"}</button>
                    </div>
                </div>
                <div className="text-center">Don&apos;t have an account? <Link href="register" className="font-extrabold">sign Up</Link> </div>
            </div>
        </AuthLayout>
    )
}

export default Page