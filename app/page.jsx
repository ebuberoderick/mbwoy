'use client'
import Image from "next/image";
import AppLayout from "./components/layouts/appLayout";
import Link from "next/link";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

export default function Home() {

  const [showBal, updateBal] = useState(false)

  return (
    <AppLayout title={"Dashboard"}>
      <div className="grid lg:grid-cols-3">
        <div className="col-span-2 space-y-5">
          <div className="h-64 hidden lg:block xl:h-80 bg-gray-100 rounded-xl">
            <div className="max-w-sm flex items-center p-5 h-full">
              <div className="">
                <div className="font-extrabold text-4xl">Mbwoy</div>
                <div className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta aliquam in ab eveniet excepturi inventore quasi aut reiciendis totam!</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="bg-black p-4 rounded-xl">
              <div className="text-white text-center flex items-center gap-2 justify-center">Current Balance <span onClick={() => updateBal(!showBal)} className='text-xl cursor-pointer'> {showBal ? <VscEyeClosed /> : <VscEye />}</span></div>
              {
                showBal ? <div className="text-white font-extrabold text-center text-3xl pb-6 pt-3">&#8358;1,000,000.00</div> : <div className="text-white font-extrabold text-center text-3xl pb-6 pt-3">*******</div>
              }

              <div className="flex-grow disabled:bg-opacity-35 shadow-md bg-white rounded-lg text-center font-bold cursor-pointer py-3">Withdraw</div>
            </div>
            <div className="px-4 py-8 bg-opacity-5 rounded-xl">
              <div className="font-bold text-lg">Trade Smart &</div>
              <div className="font-bold text-lg">Efficient with us</div>
              <div className="text-sm text-gray-400">Trade and get paid in few click</div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Link href="/" className="px-4 py-8 bg-opacity-5 rounded-xl bg-blue">
              <div className="font-bold text-lg text-blue">Sell Giftcard</div>
              <div className="text-sm w-48 text-gray-400">Sell any kind of giftcard with ease</div>
            </Link>
            <Link href="/" className="px-4 py-8 bg-opacity-5 rounded-xl bg-success">
              <div className="font-bold text-lg text-success">Sell Crypto Currency</div>
              <div className="text-sm w-48 text-gray-400">Sell crypto at best market rate with Mbwoy</div>
            </Link>
            <Link href="/" className="px-4 py-8 bg-opacity-5 rounded-xl bg-danger">
              <div className="font-bold text-lg text-danger">Sell E-Fund</div>
              <div className="text-sm w-48 text-gray-400">Sell E-Fund at best market</div>
            </Link>
          </div>
        </div>
        <div className=""></div>
      </div>
    </AppLayout>
  );
}
