import { useState } from "react";
import UseFormHandler from "@/app/hooks/useFormHandler";
import AppInput from "../../organisms/AppInput";

const DeleteAccount = ({ goBack }) => {
  
  const [showModal, setShowModal] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [disable, setDisabled] = useState(true);
  const [deleteAccountErrorMessage,setDeleteAccountErrorMessage] = useState("")

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
      }else{
        setDeleteAccountErrorMessage(data.message);
      }
    }
  })

  return (
    <form onSubmit={(e) => {e.preventDefault(); deleteAccount.submit()}} className="flex gap-5 flex-col h-full md:h-auto">
      {/* {showModal && <DeleteAccountModal close={() => setShowModal(false)} />} */}
      <div className="text-center dark:text-white-1 md:hidden py-4 relative">
        <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><i className="ri-arrow-left-s-line"></i></div>
        <div className="">Delete Account</div>
      </div>
      <div className="hidden md:block border-[#CED2DA] border-b pb-4 mb-4">
        <span className="text- dark:text-white-1 font-semibold">Delete Account</span>
      </div>

      <div className="md:w-[65%] px-4 md:px-0 space-y-11 flex-grow md:flex-grow-0 ">
        <div className="font-normal text-sm dark:text-white-1">
          To proceed with deleting your account, please let us know the reason for your departure. Once we receive this information, we&apos;ll process your request promptly. Thank you.
        </div>
        <div className="space-y-5">
          <AppInput type={"text"} label={"Email Address"} required name={"Email"}/>
          <AppInput type={"textarea"}  label={"Reason(s)"} required name={"reason"}/>
        </div>
        <div className="flex items-start">
          <AppInput type={"checkbox"} />
          <p className="font-medium relative -left-10 dark:text-gray-300 leading-[24px] text-[#344051] text-[15px]">
            Yes, I want to permanently delete my account and all my personal information attached to this acocunt.
          </p>
        </div>
      </div>

      <div className="md:w-[65%] pb-8 px-4 md:px-0">
        <button disabled={disable} className="bg-[#F64C4C] px-6 py-4 w-full disabled:bg-gray-200 dark:disabled:bg-gray-700 dark:disabled:text-gray-600 md:w-auto text-[#FFFFFF] font-semibold md:font-light md:text-xs  rounded-xl">
          Send Request
        </button>
      </div>
    </form>
  );
};

export default DeleteAccount;
