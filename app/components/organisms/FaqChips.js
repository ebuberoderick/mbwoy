
import React, { useState } from 'react'
import {FaAngleDown, FaAngleUp   } from 'react-icons/fa'

function FaqChips({title,content}) {
    const [hideContent, displayContent] = useState(false);
    const [icon, setIcon] = useState(<FaAngleDown />);

    const toggleContent = () => {
        displayContent(!hideContent);
        setIcon(!icon)
    };
    return (
        
        <div  data-aos="fade-in">
            <li className='text-textBlack text-[16px] cursor-pointer font-[600] flex justify-between pr-6'
               
                onClick={toggleContent}
            >
                {title}
                <span>
                  {icon ? <FaAngleDown /> : <FaAngleUp />}
                </span>
            </li>
            {hideContent && (
                <div className="dropdown  top-10 text-paraText">{content}</div>
            )}
        </div>
    )
}

export default FaqChips