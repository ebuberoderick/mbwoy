'use client'
import AuthLayout from '@component/layouts/authLayout'
import AppInput from '@component/organisms/AppInput'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import OtpInput from 'react-otp-input';

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const user = useSelector(state => state.User)
    const [code, setCode] = useState("");
    const [otp, setOtp] = useState('');


    const confirmOTP = async (e) => {
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
        <AuthLayout errMsg={errMsg} onSubmit={(e) => confirmOTP(e)} title={"Set Transaction Pin"} subText={"Please fill in your details"}>
            <div className="space-y-4">
                <div className="justify-center flex *:gap-4">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
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
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Set Pin"}</button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Page