"use client";
import Image from 'next/image';
import Logo from '@assets/images/viloxLogo.png';
import { MobileView } from './MobileView';

const Navbar = () => {

  return (
    <div className="navbar container-fluid flex lg:px-14 px-5 py-4 justify-between items-center fixed bg-white w-full right-0 left-0 top-0 shadow-md z-[999]"
    >
      <a href="#">
        <Image src={Logo} alt="Mbwoy Logo" className='mobileViewLogo' />
      </a>
      < ul className='lg:flex gap-10 m-0 p-0 justify-end items-center hidden' >
        <li className='list-none'>
          <a href="/"
            className='font-normal text-'>
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
  
          >
            FAQs
          </a>
        </li>
        <li className='list-none'>
          <a href="#contact"
            className='font-normal'
         
          >
            Contact us
          </a>
        </li>
        <button className="px-6 py-3 rounded border-2 border-solid border-blackText"
  
        >Download App</button>
      </ul>
      <MobileView />

    </div>
  );
}

export default Navbar;
