import { FaAngleLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppSwitch from "../../organisms/AppSwitch";

const Notifications = ({ goBack }) => {

  const getNotification = async () => {
    const { status, data } = await getNotificationPreference().catch(err => console.log(err))
    setNotifyArr(data.data);
  }


  useEffect(() => {
    // getNotification()
  }, [])

  return (
    <section>
      <div className="text-center md:hidden dark:text-white-1 py-4 relative">
        <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
        <div className="">Notifications</div>
      </div>
      <div className="hidden md:block dark:border-gray-600 border-[#CED2DA] border-b pb-4 mb-4">
        <span className="text-[18px] dark:text-white-1 font-semibold">Notifications</span>
      </div>
      <div className="md:rounded-xl border dark:border-gray-700 overflow-hidden md:shadow-md">
        <div className="hidden md:flex font-bold py-2 px-6 text-white bg-gray-900 dark:bg-gray-950">
          <div className="flex-grow">Notification</div>
          <div className="">Mobile</div>
        </div>
        <div className="divide-y dark:divide-gray-600 dark:bg-gray-900 bg-gray-100">
          <div className="flex gap-6 items-center px-6 py-4">
            <div className="flex-grow">
              <div className="font-medium dark:text-white-1">Enable Push Notification</div>
              <div className="text-sm text-[#637083] dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel perspiciatis consectetur deserunt, sint debitis cumque laudantium! Vero quis aliquid tenetur.
              </div>
            </div>
            <div className="">
              <AppSwitch state={false} swiching={false} activeColor="#0095BE" />
            </div>
          </div>
          <div className="flex gap-6 items-center px-6 py-4">
            <div className="flex-grow">
              <div className="font-medium dark:text-white-1">Enable Email Notification</div>
              <div className="text-sm text-[#637083] dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel perspiciatis consectetur deserunt, sint debitis cumque laudantium! Vero quis aliquid tenetur.
              </div>
            </div>
            <div className="">
              <AppSwitch state={true} swiching={false} activeColor="#0095BE" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
