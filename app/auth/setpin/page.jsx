'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import OtpInput from 'react-otp-input';
import AuthLayoutX from '@/app/components/layouts/authLayoutX'
import { setTransactionPin } from '@/app/services/authService'

function Page() {
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const [pin, setPin] = useState('');


    const confirmPin = async (e) => {
        if (pin.length === 4) {
            setProccessing(true)
            e.pin = pin
            const { status, data } = await setTransactionPin(e).catch(err => console.log(err))
            setProccessing(false)
            if (status) {
                setErrMsg('')
                router.push("referral")
            } else {
                setErrMsg(data.message)
            }
        }
    }



    return (
        <AuthLayoutX errMsg={errMsg} onSubmit={(e) => confirmPin(e)} title={"Set Transaction Pin"} subText={"Please fill in your details"}>
            <div className="space-y-7">
                <div className="justify-center flex *:gap-4">
                    <OtpInput
                        value={pin}
                        onChange={setPin}
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
        </AuthLayoutX>
    )
}

export default Page