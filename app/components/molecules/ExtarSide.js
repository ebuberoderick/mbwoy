import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import F1 from "@assets/images/F1.png"
import F2 from "@assets/images/F2.png"
import F3 from "@assets/images/F3.png"

function ExtarSide() {
    const [counter, setCounter] = useState(1);
    useEffect(() => {
      counter < 3 ? setTimeout(() => setCounter(counter + 1), 8000) : setTimeout(() => setCounter(1), 8000);
    }, [counter]);
    return (
        <div className='px-3 hidden xl:block '>
            <div className='h-full rounded-3xl'>
                <div className='flex text-center flex-col h-full w-full rounded-3xl'>
                    <div className='flex-grow relative'>
                        <div className="absolute w-full bottom-0 ">
                            {counter === 1 && <Image src={F1} draggable={false} className="pointer-events-none mx-auto transition-all duration-500" alt="LOGO" />}
                            {counter === 2 && <Image src={F2} draggable={false} className="pointer-events-none mx-auto transition-all duration-500" alt="LOGO" />}
                            {counter === 3 && <Image src={F3} draggable={false} className="pointer-events-none mx-auto transition-all duration-500" alt="LOGO" />}

                        </div>
                    </div>
                    <div className='px-5 pb-5'>
                        {
                            counter === 1 && (
                                <div className='py-14 space-y-4 border border-gray-800 rounded-3xl'>
                                    <div className='font-extrabold text-4xl'>Welcome to Mbwoy</div>
                                    <div className='text-gray-500 text-sm max-w-sm mx-auto'>Mbwoy is your onestep solution for selling gift cards, crypto currencies and electronic funds</div>
                                </div>
                            )
                        }

                        {
                            counter === 2 && (
                                <div className='py-14 space-y-4 border border-gray-800 rounded-3xl'>
                                    <div className='font-extrabold text-4xl'>Sell with Ease</div>
                                    <div className='text-gray-500 text-sm max-w-sm mx-auto'>With Mbwoy, selling is simple and secure.It&apos;s fast, convenient, and puts money back in your pocket.</div>
                                </div>
                            )
                        }


                        {
                            counter === 3 && (
                                <div className='py-14 space-y-4 border border-gray-800 rounded-3xl'>
                                    <div className='font-extrabold text-4xl'>Unlock Your Assets</div>
                                    <div className='text-gray-500 text-sm max-w-sm mx-auto'>Mbwoy enables you to optimize the value of your assets. Sign up for an Mbwoy account today.</div>
                                </div>
                            )}

                    </div>
                    {/* <div></div> */}
                    <div className='flex pb-12 justify-center gap-2'>
                        <div className={`h-2 ${counter === 1 ? 'bg-black w-8' : 'w-2 bg-gray-400'} transition-all duration-500 rounded-full cursor-pointer`} onClick={() => setCounter(1)}></div>
                        <div className={`h-2 ${counter === 2 ? 'bg-black w-8' : 'w-2 bg-gray-400'} transition-all duration-500 rounded-full cursor-pointer`} onClick={() => setCounter(2)}></div>
                        <div className={`h-2 ${counter === 3 ? 'bg-black w-8' : 'w-2 bg-gray-400'} transition-all duration-500 rounded-full cursor-pointer`} onClick={() => setCounter(3)}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExtarSide