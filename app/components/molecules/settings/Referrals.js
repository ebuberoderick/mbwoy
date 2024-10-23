import { FaAngleLeft } from "react-icons/fa6";
import referral from "@assets/images/RF.png"
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import { fetchReferrals } from "@/app/services/authService";
import logo from "@assets/images/20240911_220045.png"
import { useState, useEffect } from "react";


const Referrals = ({ goBack }) => {

    const [loading, setLoading] = useState(true)
    const [referralList, setReferralList] = useState([])

    const fetch = async () => {
        const { status, data } = await fetchReferrals().catch(err => console.log(err))
        if (status) {
            setReferralList(data.data);
        }
        setLoading(false)
    }


    useEffect(() => {
        fetch()
    }, [])


    return (
        <div className="flex flex-col h-full">
            <div className="text-center dark:text-white-1 md:hidden py-4 relative">
                <div onClick={() => goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
                <div className="">Referrals</div>
            </div>
            <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
                <div className='flex items-center pt-5 lg:pt-0'>
                    <div onClick={() => goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
                    <span className="text-[18px] dark:text-white-1 font-semibold">Referrals</span>
                </div>
            </div>

            <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
                <div>
                    <Image src={referral} alt="referral" className="h-72 w-auto mx-auto" />
                </div>
                <div className="max-w-[300px] space-y-2 mx-auto text-center">
                    <div className="font-bold text-2xl">Redeemed &#8358;{!loading && Number(referralList?.user.wallet.bonus).toLocaleString("en-US")}</div>
                    <div className="text-xs text-gray-400">Each time a friend signs up and transact with Vilox using your referral code.</div>
                    <div title="Click to copy" onClick={() => navigator?.clipboard?.writeText(!loading && referralList?.user.referral_id)} className="inline-flex gap-2 p-1 cursor-pointer rounded-lg bg-black">
                        <div className="text-white pl-2">{!loading && referralList?.user.referral_id}</div>
                        <div className="bg-white rounded-md flex items-center justify-center w-7 h-7"><FaRegCopy /></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="font-extrabold text-lg">Your Referrals</div>
                    <div className="space-y-1">
                        {
                            !loading && referralList?.referrals.map((x, i) => (
                                <div className="flex items-center gap-2">
                                    <div>
                                        <div key={i} className="w-12 h-12 bg-gray-50 rounded-full overflow-hidden">
                                            <Image
                                                src={x.avatar === "avatar.png" ? logo : x.avatar}
                                                alt={x?.name}
                                                className="w-full h-full rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">{x.name}</div>
                                        <div className="text-sm text-gray-400">{x.email}</div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            !loading && referralList?.referrals.length === 0 && (
                                <div className="space-y-2 pt-12">
                                    <div className="text-center text-gray-400">There is no recent transaction</div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Referrals;
