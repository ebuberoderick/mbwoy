import React from 'react'
import google from '@assets/images/google.png'
import Image from 'next/image'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

function GoogleBtn() {


    const login = useGoogleLogin({
        // onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <div>
            <div onClick={() => login()} className="bg-gray-100 cursor-pointer hover:bg-gray-200 flex gap-1 justify-center py-3 rounded-lg">
                <Image  draggable={false} className="pointer-events-none w-6 h-6" alt="google" src={google} /> Sign up with Google
            </div>
            {/* <GoogleLogin
                onSuccess={credentialResponse => {
                    // console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            /> */}
        </div>
    )
}

export default GoogleBtn