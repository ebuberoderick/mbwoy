import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { pagination } from '@/app/services/authService';

function AppPagination({ totalRecords, newData }) {
    const goto = async (url) => {
        const { status, data } = await pagination(url).catch(err => console.log(err))
        newData(data.data)
    }
    return (
        <div className="flex flex-wrap gap-4">
            {
                totalRecords?.links?.length > 3 && totalRecords?.links?.map((link, i) => (
                    <div key={i}>
                        {
                            link.label === "&laquo; Previous" ? (
                                <div className={`${link.active ? "bg-gray-300" : "bg-gray-50 text-gray-200"} px-4 py-2 rounded-lg`}><i className="ri-arrow-left-s-line"></i></div>
                            ) : link.label === "Next &raquo;" ? (
                                <div className={`${link.active ? "bg-gray-300" : "bg-gray-50 text-gray-200"} px-4 py-2 rounded-lg`}><i className="ri-arrow-right-s-line"></i></div>
                            ) : link.label === "..." ? (
                                <div className={`${link.active ? "bg-black text-white" : "bg-gray-100"} px-4 py-2 rounded-lg`}>{link.label}</div>
                            ) : (
                                <div onClick={() => { !link.active && goto(link.url) }} className={`${link.active ? "bg-black text-white" : "bg-gray-100"} cursor-pointer px-4 py-2 rounded-lg`}>{link.label}</div>
                            )
                        }
                    </div>
                ))
            }
        </div >
    )
}

export default AppPagination