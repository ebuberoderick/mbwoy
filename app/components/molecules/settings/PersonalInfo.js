import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import AppInput from "../../organisms/AppInput";
import { BsCamera } from "react-icons/bs";
import Image from "next/image";

const PersonalInfo = ({ goBack }) => {
  const user = useSelector((state) => state.User.value.user);
  const [selectedUpdateImage, setSelectedUpdateImage] = useState(user?.avatar);
  const [disable, setDisabled] = useState(true)
  const [formError, setFormError] = useState("")
  const [changed, setChanged] = useState(false)
  const dispatch = useDispatch()

  const uploadUpdateImg = async (e) => {
    setChanged(true)
    setDisabled(false)
    if (e.target.files && e.target.files.length > 0) {
      setSelectedUpdateImage(e.target.files[0]);
    }
  }
  return (
    <div>
      {/* <div className="flex relative md:pr-4 flex-col h-full">
        <div className="text-center dark:text-white-1 md:hidden py-4 relative">
          <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
          <div className="">Personal Info</div>
        </div>
        <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
          <div className='flex items-center'>
            <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
            <span className="text-[18px] dark:text-white-1 font-semibold">Personal Info</span>
          </div>
        </div>
        <div className="h-28 w-28 mx-auto lg:mx-0 rounded-full bg-gray-200 relative">
          <img
            src={changed ? URL.createObjectURL(selectedUpdateImage) : selectedUpdateImage}
            alt={user?.name}
            className="w-full h-full rounded-full"
            width={'150'}
            height={'150'}
          />
          <div onClick={() => document.querySelector('#imgTwo').click()} className="absolute flex items-center justify-center w-8 h-8 bg-black border-2 border-white rounded-full bottom-0 right-0 cursor-pointer text-white">
            <BsCamera />
          </div>
          <input name="image" id="imgTwo" onChange={(e) => uploadUpdateImg(e)} type="file" className="opacity-0" accept="image/png, image/gif, image/jpeg" />
        </div>
        <div className="px-4 md:px-0 text-danger text-sm">{formError}</div>
        <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 lg:w-[65%]">
          <AppInput type={"text"} value={user?.email} label={"Email"} required name={"current_password"} />
          <AppInput type={"text"} defaultValue={user?.phone} onChange={(e) => setDisabled(false)} label={"Phone"} required name={"new_password"} />
          <AppInput type={"text"} defaultValue={user?.name} onChange={(e) => setDisabled(false)} label={"Fullname"} required name={"comfirm_password"} />
          <AppInput type={"textarea"} defaultValue={user?.address} onChange={(e) => setDisabled(false)} label={"Address"} required name={"comfirm_password"} />
          <AppInput type={"text"} value={user?.referral_by} label={"Reffered By"} />
        </div>
        <div className="flex px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
          <button disabled={disable} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
            Confirm
          </button>
          <button className="font-semibold w-full md:w-auto text-[#344051]">Cancel</button>
        </div>
      </div> */}

      <form onSubmit={(e) => changeNow(e)} className="flex flex-col h-full">
        <div className="text-center dark:text-white-1 md:hidden py-4 relative">
          <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
          <div className="">Personal Info</div>
        </div>
        <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
          <div className='flex items-center pt-5 lg:pt-0'>
            <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
            <span className="text-[18px] dark:text-white-1 font-semibold">Personal Info</span>
          </div>
        </div>

        <div className="px-4 md:px-0 text-danger text-sm">{formError}</div>
        <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
          <div className='w-full overflow-hidden'>
            <div className="h-28 w-28 mx-auto lg:mx-0 rounded-full bg-gray-200 relative">
              <img
                src={changed ? URL.createObjectURL(selectedUpdateImage) : selectedUpdateImage}
                alt={user?.name}
                className="w-full h-full rounded-full"
                width={'150'}
                height={'150'}
              />
              <div onClick={() => document.querySelector('#imgTwo').click()} className="absolute flex items-center justify-center w-8 h-8 bg-black border-2 border-white rounded-full bottom-0 right-0 cursor-pointer text-white">
                <BsCamera />
              </div>
              <input name="image" id="imgTwo" onChange={(e) => uploadUpdateImg(e)} type="file" className="opacity-0 absolute" accept="image/png, image/gif, image/jpeg" />
            </div>
          </div>
          <AppInput type={"text"} value={user?.email} label={"Email"} required name={"current_password"} />
          <AppInput type={"text"} defaultValue={user?.phone} onChange={(e) => setDisabled(false)} label={"Phone"} required name={"new_password"} />
          <AppInput type={"text"} defaultValue={user?.name} onChange={(e) => setDisabled(false)} label={"Fullname"} required name={"comfirm_password"} />
          <AppInput type={"textarea"} defaultValue={user?.address} onChange={(e) => setDisabled(false)} label={"Address"} required name={"comfirm_password"} />
          <AppInput type={"text"} value={user?.referral_by} label={"Reffered By"} />
        </div>
        <div className="flex px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
          <button disabled={disable} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
            Confirm
          </button>
          <button className="font-semibold w-full md:w-auto text-[#344051]">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
