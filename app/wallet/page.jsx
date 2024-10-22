'use client'
import AppLayout from '@/app/components/layouts/appLayout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { fetchTransactions, fetchWallet } from '../services/authService'
import { FaMoneyBills } from 'react-icons/fa6'
import Ticon from "@assets/images/TIcon.png"
import Image from 'next/image'

function Page() {
  const router = useRouter()

  const [showBal, updateBal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [transactions, updateTransactions] = useState([])

  const [walletInfo, updateWalletInfo] = useState({ balance: 0.00 })


  const FW = async () => {
    const { status, data } = await fetchWallet().catch(err => console.log(err))
    if (status) {
      updateWalletInfo(data.data[0]);
    }
  }

  const FT = async () => {
    const { status, data } = await fetchTransactions().catch(err => console.log(err))
    if (status) {
      updateTransactions(data.data[0]);
    }
  }




  const fetch = async () => {
    await FW()
    await FT()
    setLoading(false)
  }


  useEffect(() => {
    fetch()
  }, [])

  return (
    <AppLayout title={`Wallet`}>
      <div className="space-y-5">
        <div className="flex items-center">
          <div className="flex-grow items-center flex">
            <div className="flex-grow">
              <div onClick={() => router.back()} className="cursor-pointer flex items-center gap-1">
                <IoIosArrowRoundBack /> Back
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3">
          <div className="col-span-2 space-y-5">
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="bg-black p-4 rounded-xl">
                <div className="text-white text-center flex items-center gap-2 justify-center">Current Balance <span onClick={() => updateBal(!showBal)} className='text-xl cursor-pointer'> {showBal ? <VscEyeClosed /> : <VscEye />}</span></div>
                {
                  showBal ? <div className="text-white font-extrabold text-center text-3xl pb-6 pt-3">&#8358;{Number(walletInfo?.balance).toLocaleString("en-US")}</div> : <div className="text-white font-extrabold text-center text-3xl pb-6 pt-3">*******</div>
                }
                <div className="">
                  <Link href="wallet/withdrawal">
                    <div className="flex-grow disabled:bg-opacity-35 shadow-md bg-white rounded-lg text-center font-bold cursor-pointer py-3">Withdraw</div>
                  </Link>
                </div>
              </div>
              <div className="px-4 hidden xl:block py-8 bg-opacity-5 rounded-xl">
                <div className="font-bold text-lg">Trade Smart &</div>
                <div className="font-bold text-lg">Efficient with us</div>
                <div className="text-sm text-gray-400">Trade and get paid in few click</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="font-bold">Recent Transactions</div>
              <div className="">
                <div className="col-span-2 space-y-2">
                  {
                    transactions.map((data, i) => (
                      <div key={i} className="p-3 flex items-center gap-2 space-y-1 cursor-pointer border rounded-xl">
                        <div className="">
                          <div className={`w-10 h-10 bg-gray-50 bg-opacity-50 rounded-full flex items-center justify-center ${data.status === "processing" ? "text-yellow" : data.status === "success" ? "text-success" : "text-danger"}`}>
                            <FaMoneyBills />
                          </div>
                        </div>
                        <div className="flex flex-grow items-center justify-between">
                          <div className="">
                            <div className="font-bold text-lg capitalize">{data.type}</div>
                            <div className="text-xs">{data.transaction_id}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold text-lg ${data.status === "processing" ? "text-yellow" : data.status === "success" ? "text-success" : "text-danger"}`}>&#8358;{Number(data.amount).toLocaleString('en-US')}</div>
                            <div className="text-xs capitalize">{data.status}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {
                    transactions.length === 0 && !loading && (
                      <div className="">
                        <div className="">
                          <Image src={Ticon} className='w-44 mx-auto' alt='' />
                        </div>
                        <div className="text-center text-gray-400">There is no recent transaction</div>
                        <div className=""></div>
                      </div>
                    )
                  }
                  {
                    loading && ["", "", "", "", "", ""].map((data, i) => (
                      <div key={i} className="p-3 flex items-center gap-2 space-y-1 cursor-pointer border rounded-xl">
                        <div className="">
                          <div className={`w-10 h-10 bg-gray-50 bg-opacity-50 rounded-full flex items-center justify-center`}>

                          </div>
                        </div>
                        <div className="flex flex-grow items-center justify-between">
                          <div className="space-y-1 ">
                            <div className="font-bold text-lg preload py-3 w-16"></div>
                            <div className="text-xs py-1 w-12 preload"></div>
                          </div>
                          <div className="space-y-1 ">
                            <div className={`font-bold text-lg preload py-3 w-24`}></div>
                            <div className="text-xs py-1 capitalize preload w-16 ml-8"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  )
}

export default Page