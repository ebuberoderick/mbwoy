'use client'
import AuthLayout from '@component/layouts/authLayout'
import AppInput from '@component/organisms/AppInput'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import GoogleBtn from '@/app/components/organisms/GoogleBtn'
import { registerAPI } from '@/app/services/authService'
import { addPreuser } from '@/app/Store/reducers/PerUser'

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()

    const register = async (e) => {
        setProccessing(true)
        setErrMsg('')
        const password = e.password.toString()
        if (e.cpassword === e.password) {
            const i = {
                email: e.email,
                name: e.firstname + ' ' + e.lastname,
                password
            }
            const { status, data } = await registerAPI(i).catch(err => console.log(err))
            if (status) {
                setErrMsg('')
                dispatch(addPreuser(data));
                router.push(`otp?em=${e.email}&uid=${data.data.user.id}`)
            } else {
                setErrMsg(data.message)
            }

        } else {
            setErrMsg('Password mis-match')
        }
        setProccessing(false)
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => register(e)} title={"Create Account"} subText={"Please fill in your details"}>
            <div className="grid grid-cols-2 gap-5">
                <AppInput name="firstname" required label="Firstname" />
                <AppInput name="lastname" required label="Lastname" />
            </div>
            <AppInput name="email" type={'mail'} required label="Email" />
            <AppInput name="password" required label="Enter your password" type="password" />
            <AppInput name="cpassword" required label="Confirm Password" type="password" />
            <div className="space-y-4">
                <div className="flex gap-3">
                    <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Create Account"}</button>
                </div>
                <div className="flex items-center gap-3">
                    <hr className="flex-grow" />
                    <div className="">or</div>
                    <hr className="flex-grow" />
                </div>
                <GoogleBtn err={e => setErrMsg(e)} />
            </div>

            <div className="text-center">Already have an account? <Link href="login" className="font-extrabold">Login</Link> </div>
        </AuthLayout>
    )
}

export default Page