'use client'
import AuthLayout from '@component/layouts/authLayout'
import AppInput from '@component/organisms/AppInput'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import GoogleBtn from '@/app/components/organisms/GoogleBtn'

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const user = useSelector(state => state.User)

    const register = async (e) => {
        router.push('otp')
        // setProccessing(true)
        // const { status, data } = await Applogin(e).catch(err => console.log(err))
        // setProccessing(false)
        // if (status) {
        //     setErrMsg('')
        //     SignInAuth(data, dispatch)
        //     router.push("/admin/dashboard")
        //     window !== "undefined" && window.location.reload()
        // } else {
        //     setErrMsg(data.message)
        // }
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => register(e)} title={"Create Account"} subText={"Please fill in your details"}>
            <div className="grid grid-cols-2 gap-5">
                <AppInput name="email" required label="Username" />
                <AppInput name="email" required label="Username" />
            </div>
            <AppInput name="email" required label="Username" />
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
                <GoogleBtn />
            </div>

            <div className="text-center">Already have an account? <Link href="login" className="font-extrabold">Login</Link> </div>
        </AuthLayout>
    )
}

export default Page