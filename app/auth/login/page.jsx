'use client'
import AuthLayout from '@component/layouts/authLayout'
import AppInput from '@component/organisms/AppInput'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import GoogleBtn from '@/app/components/organisms/GoogleBtn'
import { Applogin } from '@/app/services/authService'
import { SignInAuth } from '@/app/hooks/Auth'

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()

    const login = async (e) => {
        setProccessing(true)
        const { status, data } = await Applogin(e).catch(err => console.log(err))
        setProccessing(false)
        if (status) {
            setErrMsg('')
            SignInAuth(data, dispatch)
            router.push("/")
            window !== "undefined" && window.location.reload()
        } else {
            setErrMsg(data.message)
        }
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => login(e)} title={"Welcome Back"} subText={"Please fill in your details"}>
            <AppInput name="email" required label="email" />
            <AppInput name="password" required label="Enter your password" type="password" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-grow">
                    <AppInput type="checkbox" name="remember" label="remember me" />
                </div>
                <Link href="forgotten-password" className="text-sm text-black hidden sm:block">Forgot Password ?</Link>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Log In"}</button>
                    </div>
                    <div className=""><Link href="forgotten-password" className="text-sm text-black sm:hidden">Forgot Password ?</Link></div>
                </div>
                <div className="flex items-center gap-3">
                    <hr className="flex-grow" />
                    <div className="">or</div>
                    <hr className="flex-grow" />
                </div>
                <GoogleBtn />
            </div>

            <div className="text-center">Don&apos;t have an account? <Link href="register" className="font-extrabold">sign Up</Link> </div>
        </AuthLayout>
    )
}

export default Page