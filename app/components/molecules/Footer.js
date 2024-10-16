import React from 'react'
import Image from 'next/image'
import Logo from '@assets/images/viloxLogo.png'
import 
{ FaFacebook,
 FaInstagram,
 FaLinkedinIn,
 FaTwitter} 
from 'react-icons/fa'

 const Footer = () => {
  return (
    <div className="lg:px-16 p-6">
        <h2
        data-aos="zoom-in-down"
        className='font-bold text-center lg:text-5xl text-3xl text-blackText'>Your go - to app for swift <br className="hidden lg:block" /> and easy transactions</h2>
        <p
        className='font-normal my-4 text-center leading-6 py-5 text-paraText'
        
        >Sell all giftcards and cryptocurrencies on Mbwoy <br className="hidden lg:block" /> and get your funds in minutes.</p>

        <div className="my-10 lg:flex items-center justify-between lg:px-16 py-10 text-center bg-footerBg" 
        
        >
            <div className="icons flex justify-center lg:justify-start item-center mb-6 lg:mb-0 gap-[30px]"
            
            >
                <a href="#" className='p-2 text-white rounded-full bg-blackText' 
               
                >
                    <FaFacebook />
                </a>
                <a href="#"
                 className='p-2 text-white rounded-full bg-blackText' 
               >
                    <FaTwitter />
                </a>
                <a href="#"
                 className='p-2 text-white rounded-full bg-blackText' 
                
                >
                <FaInstagram />
                </a>
                <a href="#" 
                 className='p-2 text-white rounded-full bg-blackText' 
                
                >
                    <FaLinkedinIn />
                </a>
            </div>
            <div className="footerImg text-center flex justify-center my-4">
                <a href="#">
                    <Image src={Logo} />
                </a>
            </div>
        </div>

            <div className="my-2 lg:flex items-center justify-between pb-6 text-center" 
        >
            <div className="icons">
                <a href="#" className='text-blackText'>Terms of Service</a>
                <a href="#" className='mx-4 text-blackText'>Privacy Policy</a>
                <a href="#" className='text-blackText'>FAQs</a>
            </div>
            <div className="footerImg">
                <a href="#" className='text-blackText'>@2024 Mbwoy. All rights reserved</a>
            </div>
        </div>
    </div>
  )
}


export default Footer