import React, { useEffect, useState } from 'react'
import Modal from '../organisms/Modal'
import AppInput from '../organisms/AppInput'
import axios from 'axios'

function AddBankModal({ isOpen, close }) {

    const [bankList, setBankList] = useState([])
    const [bank, setBank] = useState([])
    const [selectedBank, setSelectedBank] = useState({})
    const [bankInfo, setBankInfo] = useState({})
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

    const x = (i) => {
        var newArray = bank.filter(function (el) {
            return el.code.toString() === i.toString();
        });
        setSelectedBank(...newArray)
        fetchAccountDetails()
    }

    const fetchAccountDetails = async () => {
        let num = document.querySelector("[name=number]").value
        let code = selectedBank?.code
        Object.keys(selectedBank).length > 0 && num.length === 10 &&
        setFetchingBank(true)
        setBankInfo({})
        await axios.get(`https://api.paystack.co/bank/resolve?account_number=${num}&bank_code=${code}`, { headers: { "Content-Type": "application/json; charset=UTF-8", Authorization: `Bearer sk_test_0661ec3e66ea207e948374e2eae342d364e372d5` } }).then(res => setBankInfo(res.data.data)).catch(err => console.log(err))
        setFetchingBank(false)


    }


    const add = async (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div>
            <Modal closeModal={close} isOpen={isOpen}>
                <form onSubmit={add} className="space-y-4">
                    <AppInput required name="number" onChange={fetchAccountDetails} label="Account Number" />
                    <AppInput type={'select'} required label='select country' onChange={e => x(e.target.value)} options={[...bankList]} />
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
                        <button className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddBankModal