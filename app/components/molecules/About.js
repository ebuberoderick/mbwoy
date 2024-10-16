import React from 'react';
import Image from 'next/image';
import aboutImg from '@assets/images/about.png';
import GooglePlay from '@assets/images/googleButton.png';
import AppStore from '@assets/images/appStoreButton.png';

const About = () => {
  return (
    <div className="my-8" id='about'>
      <h2 className="text-3xl font-bold text-center text-blackText" data-aos="fade-up">
        About Mbwoy
      </h2>
      <p className="text-1xl font-normal text-center py-4 text-paraText"  data-aos="fade-up" data-aos-delay="200">
        Get to understand Mbwoy and what we do.
      </p>
      <div className="lg:grid grid-cols-2 lg:p-10 p-0">
        <div className="gridContent p-4" >
          <Image src={aboutImg} alt="About Mbwoy" data-aos="zoom-in" />
        </div>
        <div className="gridContent h-auto p-6">
          <div className="p-6 bg-footerBg rounded-[20px]" data-aos="fade-up">
            <h5 className="text-2xl font-bold text-blackText">
              Why Us
            </h5>
            <p className="py-5 font-normal leading-8 text-paraText" >
              Mbwoy has being in business for few year now, thou we have being working offline. Judging from comments we are rated one of the best exchange platform.
              We buy gift cards of all kind, give you the best exchange rate, fast payment, very secure, and a good customer service.
            </p>
          </div>
          <div className="my-10 p-6 bg-footerBg rounded-[20px]"   data-aos="fade-down" data-aos-delay="200">
            <h5 className="text-2xl font-bold text-blackText">
              Our Mission
            </h5>
            <p className="py-5 font-normal leading-8 text-paraText" >
              Our mission is to make the exchange of gift card very seamless and fast.
            </p>
          </div>
          <div className="buttonDivs flex my-10 space-x-6 items-center" data-aos="fade-up">
            <a href="">
              <Image src={GooglePlay} alt="Google Play" />
            </a>
            <a href="">
              <Image src={AppStore} alt="App Store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
