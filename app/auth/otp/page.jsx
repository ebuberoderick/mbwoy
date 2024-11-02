'use client'
import AuthLayout from '@component/layouts/authLayout'
import AppInput from '@component/organisms/AppInput'
import Link from 'next/link'
import React, { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import OtpInput from 'react-otp-input';
import { resendOTP, verifyOTP } from '@/app/services/authService'
import { useEffect } from 'react'
import { SignInAuth } from '@/app/hooks/Auth'
import { addPreuser } from '@/app/Store/reducers/PerUser'

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [otp, setOtp] = useState('');
    const [counter, setCounter] = useState(60);
    const user = useSelector(state => state.PerUser)



    const resend = async () => {
        setCounter(60)
        const e = {
            user_id: searchParams.get('uid'),
            email: searchParams.get('em')
        }
        const { status, data } = await resendOTP(e).catch(err => console.log(err))
        
    }

    const confirmOTP = async (e) => {
        e.otp = otp
        e.email = searchParams.get('em')
        if (otp.length === 5) {
            setProccessing(true)
            const { status, data } = await verifyOTP(e).catch(err => console.log(err))
            setProccessing(false)
            if (status) {
                setErrMsg('')
                SignInAuth(user.value, dispatch)
                dispatch(addPreuser({}))
                window !== "undefined" && (window.location.href = 'setpin');
            } else {
                setErrMsg(data.message)
            }
        }
    }


    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);





    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => confirmOTP(e)} title={"Verify OTP"} subText={"Please fill in your details"}>
            <div className="space-y-4">
                <div className="justify-center flex *:gap-4">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={5}
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
                            background: "#f3f4fa"
                        }}
                        focusStyle={'outline-none ring-0 border border-gray-400'}
                        renderInput={(props) => <input name='otp' {...props} />}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Confirm"}</button>
                    </div>
                </div>
                <div className="text-center space-y-3 select-none">
                    <div className="text-sm">00:{counter < 10 && '0'}{counter}</div>
                    {counter < 1 && <div className="font-bold cursor-pointer" onClick={resend}>Resend OTP</div>}
                </div>
            </div>
        </AuthLayout>
    )
}

export default Page