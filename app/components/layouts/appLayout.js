"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Session } from "@/app/hooks/Auth";
import SideNav from "../molecules/SideNav";

function AppLayout({ children, title }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const [greetings, setGreetings] = useState("")
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowNav(false)
    })
    var today = new Date()
    var curHr = today.getHours()
    if (curHr < 12) {
      setGreetings('Morning')
    } else if (curHr < 18) {
      setGreetings('Afternoon')
    } else {
      setGreetings('Evening')
    }
  }, [])


  if (isAuthenticated.status === "unauthenticated") {
    router.push("/auth/login");
  } else {
    return (
      <>
        <div className={`bg-gray-50 z-50 transition-all ${showNav ? "left-0" : "-left-64 md:left-0"} duration-300  relative`}>
          <SideNav user={user} />
        </div>
        <div className={`p-4 pb-8 md:ml-64 relative space-y-5 bg-gray-50 bg-opacity-10 transition-all duration-300 select-none min-h-screen`}>
          {title?.length > 0 && (<div className="">
            <div className="text-xl">Good {greetings} {user.value.user.name.split(" ")[0]}!</div>
            <div className="text-xs text-gray-400">{title}</div>
          </div>)}
          <div onClick={() => setShowNav(!showNav)} className="h-8 w-8 absolute top-4 right-5 bg-black md:hidden text-white rounded-md text-xl flex items-center justify-center cursor-pointer"><i className="ri-menu-line"></i></div>
          {children}
        </div>
      </>
    );
  }
}

export default AppLayout;
