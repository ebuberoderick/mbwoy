import { useState } from "react";
import UseFormHandler from "@/app/hooks/useFormHandler";
import AppInput from "../../organisms/AppInput";
import { FaAngleLeft } from "react-icons/fa";

const DeleteAccount = ({ goBack }) => {

  const [showModal, setShowModal] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [disable, setDisabled] = useState(true);
  const [deleteAccountErrorMessage, setDeleteAccountErrorMessage] = useState("")

  const deleteAccount = UseFormHandler({
    required: {
      email: "Please enter your email",
      reason: "Please enter your reasons(s)",
    },
    initialValues: {
      email: "",
      reason: ""
    },
    onSubmit: async (value) => {
      setDisabled(true)
      setDeleteAccountErrorMessage("")
      const { status, data } = await deactivateAccount(value).catch(err => console.log(err))
      if (status) {
        setShowModal(true);
        goBack()
      } else {
        setDeleteAccountErrorMessage(data.message);
      }
    }
  })

  return (
    <form onSubmit={(e) => {e.preventDefault(); deleteAccount.submit()}} className="flex flex-col h-full">
      <div className="text-center dark:text-white-1 md:hidden py-4 relative">
        <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
        <div className="">Delete Account</div>
      </div>
      <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
        <div className='flex items-center pt-5 lg:pt-0'>
          <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
          <span className="text-[18px] dark:text-white-1 font-semibold">Delete Account</span>
        </div>
      </div>

      <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
        <div className="font-normal text-sm dark:text-white-1">
          To proceed with deleting your account, please let us know the reason for your departure. Once we receive this information, we&apos;ll process your request promptly. Thank you.
        </div>
        <div className="space-y-5">
          <AppInput type={"text"} label={"Email Address"} required name={"Email"} />
          <AppInput type={"textarea"} label={"Reason(s)"} required name={"reason"} />
        </div>
        <div className="flex items-start">
          <AppInput type={"checkbox"} />
          <p className="font-medium relative -left-10 dark:text-gray-300 leading-[24px] text-[#344051] text-[15px]">
            Yes, I want to permanently delete my account and all my personal information attached to this acocunt.
          </p>
        </div>

        <div className="md:w-[65%] pb-8 px-4 md:px-0">
          <button disabled={disable} className="bg-[#F64C4C] px-6 py-4 w-full disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600 md:w-auto text-[#FFFFFF] font-semibold md:font-light md:text-xs  rounded-xl">
            Send Request
          </button>
        </div>
      </div>
    </form>
  );
};

export default DeleteAccount;
