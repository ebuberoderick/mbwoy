'use client'
import Image from "next/image";
import AppLayout from "./components/layouts/appLayout";
import Link from "next/link";
import imagaBanner from "@assets/images/1.png"
import f from "@assets/images/ft.png"
import s from "@assets/images/se.png"
import t from "@assets/images/thr.png"
import fu from "@assets/images/fur.png"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { fetchWallet } from "./services/authService";
import ExtarSide from "./components/molecules/ExtarSide";

export default function Home() {

  const [showBal, updateBal] = useState(false)
  const [walletInfo, updateWalletInfo] = useState({ balance: 0.00 })

  const fetch = async () => {
    const { status, data } = await fetchWallet().catch(err => console.log(err))
    if (status) {
      updateWalletInfo(data.data[0]);
    }
  }


  useEffect(() => {
    fetch()
  }, [])

  return (
    <AppLayout title={"Dashboard"}>
      <div className="grid lg:grid-cols-3">
        <div className="col-span-2 space-y-5">
          <div className="h-64 hidden lg:block xl:h-80 relative bg-gray-100 rounded-xl">
            <Image draggable={false} src={imagaBanner} className="absolute hidden z-0 pointer-events-none xl:block bottom-0 right-0 h-96 w-auto" />
            <div className="max-w-sm flex items-center relative z-20 p-5 h-full">
              <div className="">
                <div className="font-extrabold text-4xl">Mbwoy</div>
                <div className="text-sm">Take Control on the Go!. Unlock the Value of Your Digital Assets Trade Gift Cards, Crypto currency & more</div>
              </div>
            </div>
          </div>
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
            <div className="px-4 py-8 bg-opacity-5 rounded-xl relative">
              <Image draggable={false} src={f} className="absolute pointer-events-none xl:hidden z-0 block bottom-12 right-6 h-32 my-auto w-auto" />
              <div className="relative z-20">
                <div className="font-bold text-lg">Trade Smart &</div>
                <div className="font-bold text-lg">Efficient with us</div>
                <div className="text-sm text-gray-400">Trade and get paid in few click</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Link href="/sell/giftcard" className="px-4 py-8 bg-opacity-5 rounded-xl bg-blue relative">
              <div className="relative z-20">
                <div className="font-bold text-lg text-blue">Sell Giftcard</div>
                <div className="text-sm w-48 text-gray-400">Sell any kind of giftcard with ease</div>
              </div>
              <Image draggable={false} src={s} className="absolute pointer-events-none xl:hidden z-0 block bottom-6 right-0 h-24 my-auto w-auto" />
            </Link>
            <Link href="/sell/crypto" className="px-4 py-8 bg-opacity-5 rounded-xl bg-success relative">
              <div className="relative z-20">
                <div className="font-bold text-lg text-success">Sell Crypto Currency</div>
                <div className="text-sm w-48 text-gray-400">Sell crypto at best market rate with Mbwoy</div>
              </div>
              <Image draggable={false} src={t} className="absolute pointer-events-none xl:hidden z-0 block bottom-6 right-0 h-24 my-auto w-auto" />
            </Link>
            <Link href="/sell/efund" className="px-4 py-8 bg-opacity-5 rounded-xl bg-danger relative">
              <div className="relative z-20">
                <div className="font-bold text-lg text-danger">Sell E-Fund</div>
                <div className="text-sm w-48 text-gray-400">Sell E-Fund at best market</div>
              </div>
              <Image draggable={false} src={fu} className="absolute pointer-events-none xl:hidden z-0 block bottom-6 right-0 h-24 my-auto w-auto" />
            </Link>
          </div>
        </div>
        <ExtarSide />
      </div>
    </AppLayout>
  );
}
