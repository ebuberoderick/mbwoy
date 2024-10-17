import React from 'react'
import google from '@assets/images/google.png'
import Image from 'next/image'

function GoogleBtn() {
    return (
        <div className="bg-gray-100 cursor-pointer hover:bg-gray-200 flex gap-1 justify-center py-3 rounded-lg">
            <Image className="w-6 h-6" alt="google" src={google} /> Sign up with Google
        </div>
    )
}

export default GoogleBtn