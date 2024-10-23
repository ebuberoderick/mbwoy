import React, { useEffect, useState } from 'react'
import Modal from '../organisms/Modal'
import AppInput from '../organisms/AppInput'
import axios from 'axios'
import { addBankAccount } from '@/app/services/authService'

function AddBankModal({ isOpen, close, refresh }) {

    const [bankList, setBankList] = useState([])
    const [proccessing, setProccessing] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [bank, setBank] = useState([])
    const [selectedBank, setSelectedBank] = useState({})
    const [bankInfo, setBankInfo] = useState({})
    const [msg, setMeg] = useState("")
    const [fetchingBank, setFetchingBank] = useState(false)


    const fetch = async () => {
        axios.get("https://api.paystack.co/bank").then(res => {
            setBank(res.data.data)
            let list = []
            res.data.data.forEach(element => {
                list.push({ value: element.code, label: element.name })
            });
            setBankList(list)
        })
    }

    const x = async (i) => {
        var newArray = bank.filter(function (el) {
            return el.code.toString() === i.toString();
        });
        setSelectedBank(...newArray)
        fetchAccountDetails()
    }

    const fetchAccountDetails = async () => {
        let num = document.querySelector("[name=number]").value
        let code = document.querySelector("[name=code]").value
        if (code.length > 0 && num.length === 10) {
            setFetchingBank(true)
            setBankInfo({})
            setMeg("")
            await axios.get(`https://api.paystack.co/bank/resolve?account_number=${num}&bank_code=${code}`, { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: `Bearer sk_test_0661ec3e66ea207e948374e2eae342d364e372d5` } }).then(res => setBankInfo(res.data.data)).catch(err => setMeg(err.response.data.message))
            setFetchingBank(false)
        }

    }


    const add = async (e) => {
        e.preventDefault()
        if (Object.keys(bankInfo).length > 0) {
            setMeg("")
            setProccessing(true)
            const { status, data } = await addBankAccount({ account_name: bankInfo.account_name, bank_name: selectedBank.name, account_number: bankInfo.account_number }).catch(err => console.log(err))
            if (status) {
                setCompleted(true)
            }else{
                setMeg(data.message);
            }
            setProccessing(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>
            <Modal promt={completed} closeModal={close} isOpen={isOpen}>
                {
                    completed ? (
                        <div className='space-y-3'>
                            <div>
                                <div className='font-bold text-2xl text-center'>Successful</div>
                                <div className='text-center'>Account Details added successfully</div>
                            </div>
                            <div>
                                <div onClick={() => { close() , refresh() }} className="bg-black text-center cursor-pointer w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
                                    Close
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={add} className="space-y-4">
                            <div className='text-xs text-danger'>{msg}</div>
                            <AppInput required name="number" onChange={fetchAccountDetails} label="Account Number" />
                            <AppInput type={'select'} required name="code" label='select country' onChange={e => x(e.target.value)} options={[...bankList]} />
                            <div className="text-right">
                                {
                                    fetchingBank ? (
                                        <div className='py-2 ml-auto w-44 preload'></div>
                                    ) : (
                                        <div className='text-right'>{bankInfo?.account_name}</div>
                                    )
                                }
                            </div>
                            <div className="flex gap-3">
                                <button disabled={proccessing} className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Save"}</button>
                            </div>
                        </form>
                    )
                }

            </Modal>
        </div>
    )
}

export default AddBankModal