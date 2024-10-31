import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import AppInput from "../../organisms/AppInput";
import { BsCamera } from "react-icons/bs";
import logo from "@assets/images/20240911_220045.png"
import Image from "next/image";
import { ImSpinner } from "react-icons/im";
import axios from "axios";
import { API_BASE_URL, TOKEN } from "@/app/services/httpService";
import serialize from "@/app/hooks/Serialize";
import { updateInfoAPI } from "@/app/services/authService";
import { addData } from "@/app/Store/reducers/UsersReducer";

const PersonalInfo = ({ goBack }) => {
  const user = useSelector((state) => state.User.value.user);
  const userx = useSelector((state) => state.User);
  const [selectedUpdateImage, setSelectedUpdateImage] = useState(user?.avatar);
  const [disable, setDisabled] = useState(true)
  const [proccessing, setProcessing] = useState(false)
  const [savingImg, setSavingImg] = useState(false)
  const [changed, setChanged] = useState(false)
  const dispatch = useDispatch()
  const headers = { 'Authorization': TOKEN }

  const uploadUpdateImg = async (e) => {
    setChanged(true)
    setDisabled(false)
    if (e.target.files && e.target.files.length > 0) {
      setSelectedUpdateImage(e.target.files[0]);
    }
  }

  const updateAvatar = async (e) => {
    const images = e.target[0].files[0]
    const formdata = new FormData()
    formdata.append(`avatar`, images)
    setSavingImg(true)
    await axios.post(`${API_BASE_URL}app/profile/change_avatar`, formdata, { headers })
  }

  const updateInfo = async (e) => {
    const i = serialize(e.target)
    i.phone = e.target[3].value
    const { status, data } = await updateInfoAPI(i).catch(err => console.log(err))
    if (status) {
      let newData = {}
      newData = { ...userx.value }
      newData.user = data.data[0]
      dispatch(addData(newData));
    }
  }




  const save = async (e) => {
    e.preventDefault()
    setProcessing(true)
    if (changed) {
      await updateAvatar(e)
    }
    await updateInfo(e)
    setSavingImg(false)
    setProcessing(false)
  }

  return (
    <div>
      <form onSubmit={(e) => save(e)} className="flex flex-col h-full">
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

        <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
          <div className='w-full overflow-hidden'>
            <div className="h-28 w-28 mx-auto lg:mx-0 rounded-full bg-gray-200 relative">
              <Image
                src={changed ? URL.createObjectURL(selectedUpdateImage) : selectedUpdateImage === "avatar.png" ? logo : selectedUpdateImage}
                alt={user?.name}
                draggable={false}
                className="pointer-events-none w-full h-full rounded-full"
                width={'150'}
                height={'150'}
              />
              {!savingImg && (
                <div onClick={() => document.querySelector('#imgTwo').click()} className="absolute flex items-center justify-center w-8 h-8 bg-black border-2 border-white rounded-full bottom-0 right-0 cursor-pointer text-white">
                  <BsCamera />
                </div>
              )}
              <input name="image" id="imgTwo" onChange={(e) => uploadUpdateImg(e)} type="file" className="opacity-0 absolute" accept="image/png, image/gif, image/jpeg" />
              {
                savingImg && (
                  <div className="bg-white flex items-center justify-center text-white text-2xl absolute h-full rounded-full w-full top-0 right-0 bg-opacity-5 backdrop-blur-md">
                    <ImSpinner className="animate-spin" />
                  </div>
                )
              }
            </div>
          </div>
          <AppInput type={"text"} value={user?.email} label={"Email"} />
          <AppInput type={"text"} defaultValue={user?.name} onChange={(e) => setDisabled(false)} label={"Fullname"} required name={"name"} />
          <AppInput type={"text"} defaultValue={user?.phone} required onChange={(e) => setDisabled(false)} label={"Phone number"} name={"phone"} />
        </div>
        <div className="flex px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
          {!proccessing && (<button disabled={disable} className="bg-black disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600  w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
            Confirm
          </button>)}

          {proccessing && (<div className="font-semibold w-full md:w-auto bg-gray-200 py-3 px-8 rounded-lg text-gray-400">Proccessing...</div>)}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
