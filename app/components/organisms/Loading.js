import Image from 'next/image'
import React from 'react'
import logo from "@assets/images/20240911_220010.png"

function Loading() {
    return (
        <div className='flex transition-all duration-500 bg-black items-center flex-col justify-center top-0 right-0 z-50 w-screen h-screen fixed'>
            <div><Image src={logo} className="h-9 w-32 animate-bounce" alt="Logo" /></div>
            <div className="lds-ellipsis *:bg-white relative bottom-8">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading