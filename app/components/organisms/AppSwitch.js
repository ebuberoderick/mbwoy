import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function AppSwitch({ state, activeColor, swiching }) {
  return (
    swiching ? (
      <div className="w-9 flex justify-center dark:text-white-1"><AiOutlineLoading className="animate-spin" /> </div>
    ) : (
      <div className={`w-9 cursor-pointer p-1 rounded-full ${state ? "bg-gray-950" : "bg-gray-200"}`}>
        <div className={`w-3 h-3 rounded-full bg-white transition-all duration-700 ${state ? "ml-auto" : "dark:bg-gray-700"}`}></div>
      </div>
    )

  )
}

export default AppSwitch