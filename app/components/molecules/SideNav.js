import Image from "next/image";
import React, { useState } from "react";
import AppLink from "../organisms/AppLink";
import logo from "@assets/images/viloxLogo.png"
import { TbUserCircle } from "react-icons/tb";
import { IoEllipsisVerticalOutline, IoWalletOutline } from "react-icons/io5";
import { CiPower } from "react-icons/ci";
import Modal from "../organisms/Modal";
import { LuHome } from "react-icons/lu";
import lox from "@assets/images/20240911_220045.png"
import { SignOut } from "@/app/hooks/Auth";
import { useDispatch } from "react-redux";
import { FaRegFileAlt } from "react-icons/fa";

function SideNav({ user }) {
  const [openModal, setModal] = useState(false)
  const dispatch = useDispatch()
  return (
    <>
      <Modal closeModal={() => { setModal(false) }} size={"sm"} isOpen={openModal}>
        <div className="space-y-3">
          <div>
            Are you sure you want to exit the app
          </div>
          <div className='flex gap-4 items-center'>
            <div onClick={() => SignOut(dispatch)} className='bg-black disabled:bg-opacity-30 cursor-pointer text-white text-center flex-grow rounded-md py-2'>Comfirm</div>
            <div onClick={() => { setModal(false) }} className='hover:bg-gray-50 text-center flex-grow rounded-md py-2 cursor-pointer'>Cancel</div>
          </div>
        </div>
      </Modal>
      <div className="fixed bg-white select-none overflow-y-auto flex flex-col h-screen shadow-md w-64 gap-y-6 py-8 px-1">
        <div className="text-2xl px-1">
          <Image src={logo} draggable={false} className="pointer-events-none w-28" alt="Michael Michael" />
        </div>
        <div className="flex-grow gap-y-4 flex flex-col gap-2">
          <div>
            <AppLink
              text={"home"}
              icon={<LuHome />}
            />

            <AppLink
              text={"wallet"}
              icon={<IoWalletOutline />}
            />

            <AppLink
              text={"transactions"}
              icon={<FaRegFileAlt />}
            />

            <AppLink
              text={"notifications"}
              icon={<i className="ri-notification-3-line"></i>}
            />
            <AppLink
              text={"settings"}
              icon={<i className="ri-settings-5-line"></i>}
            />
          </div>

        </div>
        <div className="space-y-3 pb-16 sm:pb-0">
          <div onClick={() => setModal(true)} className="text-danger hover:bg-danger hover:bg-opacity-15 flex px-3 py-2 items-center gap-1 rounded-lg cursor-pointer">
            <CiPower className="text-2xl" /> SignOut
          </div>
          <div className="px-2 flex items-center gap-2">
            <div>
              <div className="w-10 h-10 bg-gray-300 rounded-full">
                <Image
                  src={user?.value?.user?.avatar === "avatar.png" ? lox : user?.value?.user?.avatar}
                  alt={user?.value?.user?.name}
                  draggable={false}
                  className="pointer-events-none w-full h-full rounded-full"
                  width={'150'}
                  height={'150'}
                />
              </div>
            </div>
            <div className="flex-grow">
              <div className="font-bold text-sm">{user.value.user.name}</div>
              <div className="text-xs text-gray-400">{user.value.user.email}</div>
            </div>
            <div>
              {/* <div className="w-8 h-8 flex items-center justify-center cursor-pointer"><IoEllipsisVerticalOutline /></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
