"use client"
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

const Appearance = ({ goBack }) => {
  const [theme, setTheme] = useState("light")
  const handleThemeToggle = () => {}

  return (
    <div className="flex flex-col h-full">
      <div className="text-center dark:text-white-1 md:hidden py-4 relative">
        <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
        <div className="">Appearance</div>
      </div>
      <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
        <div className='flex items-center pt-5 lg:pt-0'>
          <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
          <span className="text-[18px] dark:text-white-1 font-semibold">Appearance</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center px-4 md:px-0 justify-center lg:justify-start gap-6 my-14">
        <div
          className={
            theme === "light"
              ? `p-2 border cursor-pointer border-black rounded`
              : `p-2 cursor-pointer rounded`
          }
          onClick={() => handleThemeToggle("light")}
        >
          <div className="h-24 w-40 rounded-md bg-white"></div>
          <span className="text-[14px] dark:text-white-1 text-[#141C24] font-medium block text-center mt-2">
            Light
          </span>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
