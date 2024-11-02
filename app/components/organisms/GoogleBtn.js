import React, { useEffect, useState } from 'react'
import google from '@assets/images/google.png'
import Image from 'next/image'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { googleAuth } from '@/app/services/authService';
import { SignInAuth } from '@/app/hooks/Auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

function GoogleBtn({ err }) {
    const [user, setUser] = useState(false);
    const [xinfo, setData] = useState({});
    const router = useRouter()
    const dispatch = useDispatch()


    const auth = async () => {
        const { status, data } = await googleAuth(xinfo).catch(err => console.log(err))
        if (status) {
            SignInAuth(data, dispatch)
            window !== "undefined" && (window.location.href = 'setpin');
        } else {
            err(data?.data?.email[0])
        }
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                err('')
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        res.data.google_id = res.data.id
                        setData(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    useEffect(() => {
        if (Object.keys(xinfo).length > 0) {
            auth()
        }
    }, [xinfo])

    return (
        <div>
            <div onClick={() => login()} className="bg-gray-100 cursor-pointer hover:bg-gray-200 flex gap-1 justify-center py-3 rounded-lg">
                <Image draggable={false} className="pointer-events-none w-6 h-6" alt="google" src={google} /> Continue with Google
            </div>
        </div>
    )
}

export default GoogleBtn