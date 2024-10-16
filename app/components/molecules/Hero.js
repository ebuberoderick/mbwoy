
import Image from 'next/image';
import HeroImg from '@assets/images/heroInfo.png'
import GooglePlay from '@assets/images/googleButton.png'
import AppStore from '@assets/images/appStoreButton.png'


 const Hero = () => {
  
  return (
    <div className="hero container w-full flex flex-col p-6 lg:pt-16  lg:p-44 text-center overflow-hidden mx-auto" 
    >
       <div className="textInfo pt-10">
       <h1 className="font-bold lg:text-7xl text-center py-4 text-4xl text-blackText"
      data-aos="zoom-in">
         
          Easily trade your Gift Cards & Cryptocurrencies with Mbwoy
        </h1>     
        <p
        data-aos="fade-up" 
        className="font-normal lg:text-2xl text-1xl text-center text-paraText"

        >
        Exchange can never go wrong with Mbwoy. We buy all kinds of gift card and Cryptocurrencies available.
        </p>
        <div className="buttonDivs flex my-10 justify-center space-x-6 items-center" data-aos="fade-up" data-aos-delay="300" >
           <a href="">
           <Image src={GooglePlay} alt="" />
           </a>
           <a href="">
           <Image src={AppStore} alt="" />
           </a>
        </div>
       </div>
       <div className="imgInfo flex justify-center" >
        <Image src={HeroImg}  />
       </div>
    </div>
  )
}

export default Hero