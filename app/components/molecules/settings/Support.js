import { FaAngleLeft, FaRegFaceSmile, FaXTwitter } from "react-icons/fa6";
import { LiaAngleRightSolid } from "react-icons/lia";
import { SiWhatsapp } from "react-icons/si";
import { RiErrorWarningLine, RiFacebookCircleLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { LuMail } from "react-icons/lu";
import ChatChip from "../../organisms/ChatChip";
import { useState } from "react";
import Link from "next/link";


const Support = ({ goBack }) => {
    const [showChat, setShowChat] = useState(false)

    return (
        <div className="flex flex-col h-full">
            <div className="text-center dark:text-white-1 md:hidden py-4 relative">
                <div onClick={() => showChat ? setShowChat(false) : goBack()} className="absolute p-2 top-3 cursor-pointer"><FaAngleLeft /></div>
                <div className="">Support</div>
            </div>
            <div className="hidden md:block dark:border-gray-500 border-[#CED2DA] border-b pb-4 mb-4">
                <div className='flex items-center pt-5 lg:pt-0'>
                    <div onClick={() => showChat ? setShowChat(false) : goBack()} className="p-2 lg:hidden top-3 cursor-pointer"><FaAngleLeft /></div>
                    <span className="text-[18px] dark:text-white-1 font-semibold">Support</span>
                </div>
            </div>

            {
                showChat ? (
                    <div className="col-span-2 space-y-5 flex-col flex items-center justify-center w-full">
                        <div className="max-w-sm rounded-2xl space-y-4 w-full">
                            <div onClick={() => setShowChat(false)} className="flex-grow hidden lg:block text-center cursor-pointer disabled:bg-opacity-35 shadow-md bg-black w-full text-white rounded-lg py-3">Back</div>
                            <ChatChip />
                        </div>
                    </div>
                ) : (
                    <div className="px-4 space-y-6 pt-5 flex-grow md:px-0 md:w-[65%]">
                        <div>
                            <div className="font-semibold text-lg">Issue/Feddback</div>
                            <div>
                                <div onClick={() => setShowChat(true)} className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                    <div><RiErrorWarningLine /></div>
                                    <div className="flex-grow">Report an Issue</div>
                                    <div><LiaAngleRightSolid /></div>
                                </div>
                                {/* <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                            <div><FaRegFaceSmile /></div>
                            <div className="flex-grow">Send Feedback</div>
                            <div><LiaAngleRightSolid /></div>
                        </div> */}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Social Media Handles</div>
                            <div>
                                <Link target="_blank" href="https://www.facebook.com/profile.php?id=100086377680178&mibextid=LQQJ4d" >
                                    <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                        <div><RiFacebookCircleLine /></div>
                                        <div className="flex-grow">Facebook</div>
                                        <div><LiaAngleRightSolid /></div>
                                    </div>
                                </Link>
                                <Link target="_blank" href="https://wa.me/message/PXILPJHJFQ2BL1" >
                                    <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                        <div><SiWhatsapp /></div>
                                        <div className="flex-grow">Whatsapp</div>
                                        <div><LiaAngleRightSolid /></div>
                                    </div>
                                </Link>
                                <Link target="_blank" href="https://x.com/mbwoyapp?s=21" >
                                    <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                        <div><FaXTwitter /></div>
                                        <div className="flex-grow">Twitter</div>
                                        <div><LiaAngleRightSolid /></div>
                                    </div>
                                </Link>
                                <Link target="_blank" href="https://www.instagram.com/mbwoyexchange/profilecard" >
                                    <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                        <div><IoLogoInstagram /></div>
                                        <div className="flex-grow">Instagram</div>
                                        <div><LiaAngleRightSolid /></div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Customer Support contacts</div>
                            <div>
                                <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                    <div><MdOutlineLocalPhone /></div>
                                    <div className="flex-grow">+2349169724828</div>
                                    <div><LiaAngleRightSolid /></div>
                                </div>
                                <div className="flex py-2 hover:px-2 transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer  items-center gap-2">
                                    <div><LuMail /></div>
                                    <div className="flex-grow">support@mbwoyafrotech.com</div>
                                    <div><LiaAngleRightSolid /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Support;
