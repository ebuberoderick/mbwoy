import { FaAngleLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import Link from "next/link";
import { sendOTP, setTransactionPin, verifyOTP } from "@/app/services/authService";
import { useSelector } from "react-redux";
const ChangePin = ({ goBack }) => {
    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const user = useSelector((state) => state.User.value.user);
    const [counter, setCounter] = useState(60);
    const [current, updateCurrent] = useState(1)
    const [err, setErr] = useState()
    const [proccessing, setProcessing] = useState(false)

    const confirm = async () => {
        setProcessing(true)
        setCounter(60)
        setErr("")
        const { status, data } = await sendOTP({ email: user?.email }).catch(err => console.log(err))
        if (status) {
            updateCurrent(2)
        }
        setProcessing(false)
    }


    const confirmOTP = async () => {
        let e = {}
        setErr("")
        e.otp = otp
        e.email = user?.email
        if (otp.length === 5) {
            setProcessing(true)
            const { status, data } = await verifyOTP(e).catch(err => console.log(err))
            setProcessing(false)
            if (status) {
                updateCurrent(3)
            } else {
                setErr(data.message)
            }
        }

    }


    const set = async () => {
        if (pin.length === 4) {
            setProcessing(true)
            let e = {}
            e.pin = pin
            const { status, data } = await setTransactionPin(e).catch(err => console.log(err))
            setProcessing(false)
            if (status) {
                setErr('')
                updateCurrent(4)
            } else {
                setErr(data.message)
            }
        }

    }

    useEffect(() => {
        current === 2 && counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter, current]);

    return (
        <div className="flex flex-col h-full">
            <div className="text-center dark:text-white-1 md:hidden py-4 relative">
                <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
                <div className="">Change Pin</div>
            </div>
            <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
                <div className='flex items-center pt-5 lg:pt-0'>
                    <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
                    <span className="text-[18px] dark:text-white-1 font-semibold">Change Pin</span>
                </div>
            </div>

            <div className="px-4 mx-auto space-y-6 pt-20 flex-grow md:px-0 md:w-[65%]">
                {
                    current === 1 && (
                        <div className='max-w-md space-y-5 text-center '>
                            <div className='space-y-3'>
                                <div className='font-bold text-xl'>Are you sure you want to change your transaction pin</div>
                                <div className='text-sm'>you will be sent a 5-digit code before you can proceed</div>
                            </div>
                            <div>
                                <div className="flex justify-center px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
                                    <button disabled={proccessing} onClick={() => confirm()} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-12 font-semibold text-[#fff] rounded-lg">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    current === 2 && (
                        <div className='max-w-md space-y-5 text-center '>
                            <div className='space-y-3'>
                                <div>
                                    <div className='text-sm'> A 5-digit code was sent to </div>
                                    <div className="text-xs text-danger">{err}</div>
                                </div>
                                <div className="justify-center flex *:gap-4">
                                    <OTPInput
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
                                            background: "#e3e4ea88"
                                        }}
                                        focusStyle={'outline-none ring-0 border border-gray-400'}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
                                    <button disabled={proccessing} onClick={() => confirmOTP()} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-12 font-semibold text-[#fff] rounded-lg">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                            <div className="text-center space-y-3 select-none">
                                <div className="text-sm">00:{counter < 10 && '0'}{counter}</div>
                                {counter < 1 && <div className="font-bold cursor-pointer" onClick={confirm}>Resend OTP</div>}
                            </div>
                        </div>
                    )
                }
                {
                    current === 3 && (
                        <div className='max-w-md space-y-5 text-center '>
                            <div className='space-y-3'>
                                <div className='font-bold text-xl'>Set new Pin</div>
                                <div className="justify-center flex *:gap-4">
                                    <OTPInput
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
                                            background: "#e3e4ea88"
                                        }}
                                        focusStyle={'outline-none ring-0 border border-gray-400'}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
                                    <button disabled={proccessing} onClick={() => set()} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-12 font-semibold text-[#fff] rounded-lg">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    current === 4 && (
                        <div className='max-w-md space-y-5 text-center '>
                            <div className='space-y-3'>
                                <div className='font-bold text-xl'>Congratulation, Transaction Pin changed successfully</div>
                            </div>
                            <div>
                                <div className="flex justify-center px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
                                    <Link href='/' className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-12 font-semibold text-[#fff] rounded-lg">
                                        Goto Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ChangePin;
