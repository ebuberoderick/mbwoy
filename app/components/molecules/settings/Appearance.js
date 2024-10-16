"use client"
import { useState } from "react";

const Appearance = ({ goBack }) => {
  const [theme, setTheme] = useState("light")

  // const handleThemeToggle = (selectedTheme) => {
  //   setTheme(selectedTheme);
  // };

  return (
    <section>
      <div className="text-center dark:text-white-1 md:hidden py-4 relative">
        <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><i className="ri-arrow-left-s-line"></i></div>
        <div className="">Appearance</div>
      </div>
      <div className="hidden md:block border-[#CED2DA] border-b pb-4 mb-4">
        <span className="text-[18px] dark:text-white-1 font-semibold">Appearance</span>
      </div>

      <div className="flex flex-wrap items-center px-4 md:px-0 justify-center lg:justify-start gap-6 my-14">

        <div
          className={
            theme === "light"
              ? `p-2 border cursor-pointer border-[#62DDFF] rounded`
              : `p-2 cursor-pointer rounded`
          }
          onClick={() => handleThemeToggle("light")}
        >
          <div className="h-24 w-40 rounded-md bg-white"></div>
          <span className="text-[14px] dark:text-white-1 text-[#141C24] font-medium block text-center mt-2">
            Light
          </span>
        </div>

        {/* <div
          className={
            theme === "dark"
              ? `p-2 border cursor-pointer border-[#62DDFF] rounded`
              : `p-2 cursor-pointer rounded`
          }
          onClick={() => handleThemeToggle("dark")}
        >
          <div className="h-24 w-40 rounded-md bg-gray-700"></div>
          <span className="text-[14px] dark:text-white-1 text-[#141C24] font-medium block text-center mt-2">
            Dark
          </span>
        </div> */}
      </div>
    </section>
  );
};

export default Appearance;
