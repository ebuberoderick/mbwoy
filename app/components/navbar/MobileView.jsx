import { useState } from 'react';
import { FaBars } from 'react-icons/fa';


export const MobileView = () => {
    const [navbarHide, navbarOpen] = useState(false);
    const  menu= () =>{
        navbarOpen(!navbarHide)
      }

    return (
        <>
      <button className='lg:hidden block'>
        <FaBars onClick={menu} />
      </button>
            {navbarHide && (
                <ul className='lg:flex gap-10 m-0 p-0 justify-end items-center mobileView' >
                    <li className='list-none'>
                        <a href="#"
                            className='font-normal'>
                            Home
                        </a>
                    </li>
                        <a href="#whyUs"
                            className='font-normal'>
                            Why use Mbwoy
                        </a>
                    <li className='list-none'>
                        <a href="#about"
                            className='font-normal'>
                            About Mbwoy
                        </a>
                    </li>
                    <li className='list-none'>
                        <a href="#faq"
                            className='font-normal'
                            style={{ color: 'rgb(15, 15, 15);' }}
                        >
                            FAQs
                        </a>
                    </li>
                    <li className='list-none'>
                        <a href="#contact"
                            className='font-normal'
                            style={{ color: 'rgb(15, 15, 15);' }}
                        >
                            Contact us
                        </a>
                    </li>
                    <button className="px-6 py-3 rounded"
                        style={{ border: '2px solid rgb(15, 15, 15)' }}
                    >Download App</button>
                </ul>
            )
            }</>
    )
}
