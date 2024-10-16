import Image from "next/image";
import wIcon from '@assets/images/w-icon.png';

const WhyUs = () => {
    return (
        <div className="whyContainer h-auto lg:p-14 p-6 bg-blackText" 
        id="whyUs"

        >
            <h4 className="text-3xl text-white font-bold text-center py-4" data-aos="fade-down">Why use Mbwoy</h4>
            <p className="text-1xl font-normal text-center text-lightText" data-aos="fade-up"
            >
                At Mbwoy we offer these key features and many more <br className="hidden lg:block" />
                Download the app and give us a try today!!
            </p>
            <div className="grid lg:grid-cols-3 my-14">
                <div className="gridItem p-6 pt-2 pb-11 lg:m-4 m-2 bg-lightText rounded-[20px]"
                    data-aos="fade-up" data-aos-delay="100"
                >
                    <Image src={wIcon} className="py-3" alt="Icon" />
                    <h5 className="font-semibold text-2xl py-3 text-blackText"
                    >Secure & Safe</h5>
                    <p  className="text-[14px] text-paraText">
                        We ensure that trading your digital assets is very safe and secure. No Ripping. No Delay. No Scam.
                    </p>
                </div>
                <div className="gridItem p-6 pt-2 pb-11 lg:m-4 m-2 bg-lightText rounded-[20px]"
                    data-aos="fade-up" data-aos-delay="200"
                >
                    <Image src={wIcon} className="py-3" alt="Icon" />
                    <h5 className="font-semibold text-2xl py-3 text-blackText"
                  
                    >Customers Satisfaction</h5>
                    <p  className="text-[14px] text-paraText">
                        Ensuring that our customers are satisfied is what keeps us moving in business. We give the best services of all.
                    </p>
                </div>
                <div className="gridItem p-6 pt-2 pb-11 lg:m-4 m-2 bg-lightText rounded-[20px]"
                
                    data-aos="fade-up" data-aos-delay="300"
                   
                    
                >
                    <Image src={wIcon} className="py-3" alt="Icon" />
                    <h5 className="font-semibold text-2xl py-3 text-blackText"
                      
                    >Fast pay, High Rate</h5>
                    <p  className="text-[14px] text-paraText">
                        Yes, we offer high rates on all cards and we give you the fastest payment method. This is a fact and not a lie, give it a try today
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
