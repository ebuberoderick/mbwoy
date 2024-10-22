"use client"
import React, { useState } from 'react'
import AppLayout from '@component/layouts/appLayout'
import PersonalInfo from '@/app/components/molecules/settings/PersonalInfo';
import ChangePassword from '@/app/components/molecules/settings/ChangePassword';
import Notifications from '@/app/components/molecules/settings/Notifications';
import DeleteAccount from '@/app/components/molecules/settings/DeleteAccount';
import Appearance from '@/app/components/molecules/settings/Appearance';
import WithdrawalAccounts from '../components/molecules/settings/WithdrawalAccounts';
import Modal from '../components/organisms/Modal';
import AppInput from '../components/organisms/AppInput';
import Referrals from '../components/molecules/settings/Referrals';
import ChangePin from '../components/molecules/settings/ChangePin';
import AboutMbwoy from '../components/molecules/settings/AboutMbwoy';
import PXT from '../components/molecules/settings/PXT';
import FAQs from '../components/molecules/settings/FAQs';
import Support from '../components/molecules/settings/Support';
import AddBankModal from '../components/molecules/AddBankModal';

function Page() {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [showNav, setShowNav] = useState(true)
  const [addAccountModal, updateAddAccountModal] = useState(false)

  const settingsTabs = [
    {
      title: "Personal Info",
      id: "personal-info",
    },
    {
      title: "Withdrawal Accounts",
      id: "withdrawal_accounts",
    },
    {
      title: "Referrals",
      id: "referrals",
    },
    {
      title: "Change Password",
      id: "change-password",
    },
    {
      title: "Change Pin",
      id: "change-pin",
    },
    {
      title: "Appearance",
      id: "appearance",
    },
    {
      title: "About Mbwoy",
      id: "about-mbwoy",
    },
    {
      title: "Privacy & Terms of Use",
      id: "pxt",
    },
    {
      title: "FAQs",
      id: "faqs",
    },
    {
      title: "Support",
      id: "support",
    },
    {
      title: "Delete Account",
      id: "delete-account",
    },

  ];


  return (
    <AppLayout>
      <AddBankModal close={() => updateAddAccountModal(false)} isOpen={addAccountModal} />
      <div className="text-xl">Settings</div>
      <div className="container relative lg:grid grid-cols-3 gap-3">
        <div className="">
          <div className="md:w-[80%] md:border dark:border-gray-700 border-[#F2F4F7] p-3 rounded-lg">
            {settingsTabs.map((tab, i) => (
              <div
                key={i}
                className={
                  activeTab === `${tab.id}`
                    ? `md:bg-[#fff] border-b dark:border-gray-600 dark:md:bg-gray-700 dark:text-white-1 md:border-none md:px-4 py-3 mb-2 md:rounded-lg md:text-[#344051] font-medium cursor-pointer md:[boxShadow:0px_2px_4px_0px_rgba(52,_64,_81,_0.12)]`
                    : `md:px-4 py-3 dark:text-white-1 dark:border-gray-600 dark:md:text-gray-300 border-b md:border-none mb-2 md:rounded-lg md:text-[#637083] font-medium cursor-pointer`
                }
                onClick={() => { setActiveTab(`${tab.id}`); setShowNav(false) }}
              >
                <div className="flex items-center">
                  <div className="flex-grow">{tab.title}</div>
                  <div className="md:hidden"><i className="ri-arrow-right-s-line"></i></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`col-span-2 min-h-screen bg-gray-50 backdrop-blur-2xl bg-opacity-0 dark:bg-[#202B37] fixed lg:relative h-screen md:h-auto w-screen md:w-full top-0 ${showNav ? "-right-full lg:right-0" : "right-0"}`}>
          <div className="h-full md:h-auto col-span-2 pb-5 overflow-y-scroll ml-0 md:ml-72 lg:ml-0 md:overflow-y-auto">
            {activeTab === "personal-info" && <PersonalInfo reset={showNav} goBack={() => setShowNav(true)} />}
            {activeTab === "change-password" && <ChangePassword goBack={() => setShowNav(true)} />}
            {activeTab === "withdrawal_accounts" && <WithdrawalAccounts openModal={() => updateAddAccountModal(true)} goBack={() => setShowNav(true)} />}
            {activeTab === "referrals" && <Referrals goBack={() => setShowNav(true)} />}
            {activeTab === "change-pin" && <ChangePin goBack={() => setShowNav(true)} />}
            {activeTab === "about-mbwoy" && <AboutMbwoy goBack={() => setShowNav(true)} />}
            {activeTab === "pxt" && <PXT goBack={() => setShowNav(true)} />}
            {activeTab === "faqs" && <FAQs goBack={() => setShowNav(true)} />}
            {activeTab === "support" && <Support goBack={() => setShowNav(true)} />}
            {activeTab === "appearance" && <Appearance goBack={() => setShowNav(true)} />}
            {activeTab === "delete-account" && <DeleteAccount goBack={() => setShowNav(true)} />}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Page