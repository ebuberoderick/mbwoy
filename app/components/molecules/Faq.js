"use client";

import FaqChips from "../organisms/FaqChips";
import Image from 'next/image';
import FaqImg from '@assets/images/faq.png';
import { faqChipsContent } from "../organisms/FaqChipsData";

const Faq = () => {

  return (
    <div className='my-4 lg:my-32 flex justify-center flex-col items-center relative mx-auto' id='faq'>
      <h2
        className='font-bold text-center text-3xl text-blackText'

        data-aos="fade-up"
      >
        Frequently Asked Questions (FAQs)
      </h2>
      <p
        className='text-xl font-normal text-center leading-4 my-3 text-paraText'
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Any questions? We’ve got you.
      </p>

      <div className="lg:grid grid-cols-2 my-11 mx-auto" >
        <div className="gridContent" data-aos="fade-out">
          <Image src={FaqImg} alt="FAQ Image" />
        </div>
        <div className="gridContent mt-18 relative lg-ml-20">
          <ul className="relative p-6 lg:p-1 item-center flex flex-col gap-[60px] lg:mt-14 lg:ml-36" >
            {
              faqChipsContent.map((faq, i) => (
                <div key={i}>
                  <FaqChips title={faq.title} content={faq.content} />
                </div>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );



};

export default Faq;
