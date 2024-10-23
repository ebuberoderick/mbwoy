import { FaAngleLeft } from "react-icons/fa6";
import { PiBankDuotone } from "react-icons/pi";
const WithdrawalAccounts = ({ goBack, openModal, bankList, loading }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="text-center dark:text-white-1 md:hidden py-4 relative">
                <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
                <div className="">Withdrawal Accounts</div>
            </div>
            <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
                <div className='flex items-center pt-5 lg:pt-0'>
                    <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
                    <span className="text-[18px] dark:text-white-1 font-semibold">Withdrawal Accounts</span>
                </div>
            </div>

            <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
                <div className='space-y-2'>
                    {bankList.length === 0 && <div className="text-sm text-gray-400">You have not added any bank for withdrawal</div>}

                    {
                        bankList.map((data, i) => (
                            <div key={i} className='cursor-pointer flex items-center gap-3 border border-gray-300 rounded-lg p-3'>
                                <div className="">
                                    <div className='bg-white shadow-md h-10 w-10 sm:h-14 sm:w-14 rounded-full flex items-center justify-center'>
                                        <PiBankDuotone />
                                    </div>
                                </div>
                                <div>
                                    <div className='font-semibold text-sm sm:text-base'>{data.account_name}</div>
                                    <div className='flex flex-wrap items-center text-xs sm:text-sm gap-1'>
                                        <div>{data.account_number}</div>
                                        <div className='w-1 h-1 rounded-full bg-black'></div>
                                        <div>{data.bank_name}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        loading && (
                            <div className="flex justify-center">
                                <div className="lds-ellipsis *:bg-black relative bottom-8">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex px-4 md:px-0 flex-col md:flex-row items-center gap-4 mt-6">
                    <div onClick={openModal} className="bg-black text-center cursor-pointer w-full md:w-auto py-3 px-5 font-semibold text-[#fff] rounded-lg">
                        Add New Account
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalAccounts;
