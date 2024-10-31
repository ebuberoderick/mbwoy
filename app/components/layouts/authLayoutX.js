"use client";
import React from "react";
import logo from "@assets/images/viloxLogo.png"
import Image from "next/image";
import authImg from "@assets/images/aythImage.png"
import { Session } from "@/app/hooks/Auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function AuthLayoutX({ title, children, onSubmit, errMsg }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const router = useRouter();
  const serialize = (form) => {
    var result = [];
    if (typeof form === "object" && form.nodeName === "FORM")
      Array.prototype.slice.call(form.elements).forEach(function (control) {
        if (
          control.name &&
          !control.disabled &&
          ["file", "reset", "submit", "button"].indexOf(control.type) === -1
        )
          if (control.type === "select-multiple")
            Array.prototype.slice
              .call(control.options)
              .forEach(function (option) {
                if (option.selected)
                  result.push(control.name + "=" + option.value);
              });
          else if (
            ["checkbox", "radio"].indexOf(control.type) === -1 ||
            control.checked
          )
            result.push(control.name + "=" + control.value);
      });
    var data = result.join("&").replace(/%20/g, "+");

    const serializeToJSON = (str) =>
      str
        .split("&")
        .map((x) => x.split("="))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: isNaN(value) ? value : Number(value),
          }),
          {}
        );

    return serializeToJSON(data);
  };

  const [counter, setCounter] = React.useState(1);
  useEffect(() => {
    counter < 3 ? setTimeout(() => setCounter(counter + 1), 8000) : setTimeout(() => setCounter(1), 8000);
  }, [counter]);


  if (isAuthenticated.status === "unauthenticated") {
    router.push("/auth/login");
  } else {
    return (
      <div className="min-h-screen grid md:grid-cols-2">
        <div className='max-w-sm mx-auto'>
          <div className="bg-white min-h-screen p-4 flex flex-col">
            <div>
              <Image src={logo} draggable={false} className="pointer-events-none w-20 mx-auto" alt="LOGO" />
            </div>
            <div className="flex-grow flex flex-col space-y-4 w-full justify-center">
              <div className="space-y-1">
                <div className="text-3xl">{title}</div>
                <div className="text-sm text-gray-400">
                  Log in to access the control center of your platform. Manage, monitor, and make data-driven decisions with ease.
                </div>
              </div>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(), onSubmit(serialize(e.target));
                  }} >
                  <div className="space-y-4">
                    <div className="text-danger text-sm">{errMsg}</div>
                    <div className="space-y-5">{children}</div>
                  </div>
                </form>
              </div>
            </div>
            {/* <div className="text-center mt-12 text-xs select-none pointer-events-none">Powered by Mbwoy</div> */}
          </div>
        </div>
        <div className='relative top-0'>
          <div className="h-screen w-full fixed text-4xl md:grid md:grid-cols-2 bottom-0 hidden p-6 pr-20">
            <div className='bg-black flex text-center flex-col h-full w-full rounded-3xl'>
              <div className='flex-grow'></div>
              <div className='p-5'>
                {
                  counter === 1 && (
                    <div className='py-20 space-y-4 border border-gray-800 rounded-3xl'>
                      <div className='text-white font-extrabold text-4xl'>Welcome to Mbwoy</div>
                      <div className='text-gray-300 text-sm max-w-sm mx-auto'>Mbwoy is your onestep solution for selling gift cards, crypto currencies and electronic funds</div>
                    </div>
                  )
                }

                {
                  counter === 2 && (
                    <div className='py-20 space-y-4 border border-gray-800 rounded-3xl'>
                      <div className='text-white font-extrabold text-4xl'>Sell with Ease</div>
                      <div className='text-gray-300 text-sm max-w-sm mx-auto'>With Mbwoy, selling is simple and secure.It&apos;s fast, convenient, and puts money back in your pocket.</div>
                    </div>
                  )
                }


                {
                  counter === 3 && (
                    <div className='py-20 space-y-4 border border-gray-800 rounded-3xl'>
                      <div className='text-white font-extrabold text-4xl'>Unlock Your Assets</div>
                      <div className='text-gray-300 text-sm max-w-sm mx-auto'>Mbwoy enables you to optimize the value of your assets. Sign up for an Mbwoy account today.</div>
                    </div>
                  )}

              </div>
              {/* <div></div> */}
              <div className='flex pb-12 justify-center gap-2'>
                <div className={`h-2 ${counter === 1 ? 'bg-white w-8' : 'w-2 bg-gray-400'} transition-all duration-500 rounded-full cursor-pointer`} onClick={() => setCounter(1)}></div>
                <div className={`h-2 ${counter === 2 ? 'bg-white w-8' : 'w-2 bg-gray-400'} transition-all duration-500 rounded-full cursor-pointer`} onClick={() => setCounter(2)}></div>
                <div className={`h-2 ${counter === 3 ? 'bg-white w-8' : 'w-2 bg-gray-400'} transition-all duration-500 rounded-full cursor-pointer`} onClick={() => setCounter(3)}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default AuthLayoutX;
