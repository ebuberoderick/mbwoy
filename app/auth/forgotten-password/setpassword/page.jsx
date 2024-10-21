'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthLayout from '@/app/components/layouts/authLayout'
import { setNewPassword, verifyReferral } from '@/app/services/authService'
import AppInput from '@/app/components/organisms/AppInput';
import Link from 'next/link'

function Page() {
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const confirmOTP = async (e) => {
        const new_password = e.new_password.toString()
        setErrMsg('')

        if (e.new_password === e.code) {
            setProccessing(true)
            const i = {
                email: searchParams.get('em'),
                new_password
            }
            const { status, data } = await setNewPassword(i).catch(err => console.log(err))
            setProccessing(false)
            if (status) {
                router.push('/');
            } else {
                setErrMsg(data.message)
            }
        } else {
            setErrMsg('Password mis-match')
        }

    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => confirmOTP(e)} title={"Reset Password"} subText={"Please fill in your details"}>
            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="space-y-3">
                        <div className="">Enter New Password</div>
                        <AppInput required label='Enter New Password' name='new_password' />
                    </div>
                    <div className="space-y-3">
                        <div className="">Confirm New Password</div>
                        <AppInput required label='Confirm New Password' name='code' />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Submit"}</button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Page