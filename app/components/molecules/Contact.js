import React from 'react'
import Image from 'next/image'
import PhoneImg from '@assets/images/contactPhone.png'

 const Contact = () => {
  return (
    <div className='container my-14 py-24 mx-auto' id='contact'>
        <h2 className='text-3xl font-bold text-center text-blackText' 
        >Contact Us</h2>
        <p className='text-1xl leading-4 font-normal py-3 text-center text-paraText'
      
        >Got any issues? Drop a message below.</p>

        <div className="lg:grid p-4 lg:p-12 mx-auto grid-cols-2  items-center justify-center gap-[40px]" >
            <div className="gridContent">
                <Image src={PhoneImg}  />
            </div>
            <div className="gridContent">
                <form>
                <div className="mb-4">
                <label for="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input type="text" placeholder='Enter Full Name' className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inputBg"
                required />
            </div>
            <div className="mb-4">
                <label for="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input type="email" placeholder='Enter Email Address'  className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inputBg"
                required />
            </div>
            <div className="mb-4">
                <label for="bio" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="bio" placeholder='Drop a message' name="bio" rows="4" className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inputBg"
                ></textarea>
            </div>
            <button type='submit' className='rounded-lg w-full bg-blackText hover:bg-inputBg hover:text-blackText text-inputBg p-4'>Submit</button>

                </form>
            </div>
        </div>
    </div>
  )
}
export default Contact