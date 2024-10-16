"use client";
import React from "react";
import logo from "@assets/images/viloxLogo.png"
import Image from "next/image";
import authImg from "@assets/images/aythImage.png"
import { Session } from "@/app/hooks/Auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function AuthLayout({ children, onSubmit, errMsg }) {
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




  if (isAuthenticated.status === "authenticated") {
    router.push("/admin/dashboard");
  } else {
    return (
      <div className="h-screen bg-black grid md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white h-screen p-4 flex flex-col">
          <div>
            <Image src={logo} className="w-20" alt="LOGO" />
          </div>
          <div className="flex-grow flex flex-col space-y-16 w-full justify-center">
            <div className="space-y-4">
              <div className="text-3xl">Welcome Back</div>
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
          <div className="text-center text-xs select-none pointer-events-none">Powered by Mbwoy</div>
        </div>
        <div className="lg:col-span-2 hidden md:flex flex-col">
          <div className="flex-grow space-y-2 px-3 py-12">
            <div className="text-white text-5xl font-bold text-center">Swift Transactions</div>
            <div className="text-gray-300 max-w-2xl text-center mx-auto">
              We&apos;ve got the tools, you&apos;ve got the power. Let&apos;s manage greatness together!
            </div>
          </div>
          <div>
            <Image src={authImg} draggable={false} className="w-2/3 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

}

export default AuthLayout;
