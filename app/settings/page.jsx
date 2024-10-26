"use client"
import React, { useState, useEffect } from 'react'
import AppLayout from '@component/layouts/appLayout'
import PersonalInfo from '@/app/components/molecules/settings/PersonalInfo';
import ChangePassword from '@/app/components/molecules/settings/ChangePassword';
import DeleteAccount from '@/app/components/molecules/settings/DeleteAccount';
import Appearance from '@/app/components/molecules/settings/Appearance';
import WithdrawalAccounts from '../components/molecules/settings/WithdrawalAccounts';
import Referrals from '../components/molecules/settings/Referrals';
import { RxExternalLink } from "react-icons/rx";
import ChangePin from '../components/molecules/settings/ChangePin';
import AboutMbwoy from '../components/molecules/settings/AboutMbwoy';
import PXT from '../components/molecules/settings/PXT';
import FAQs from '../components/molecules/settings/FAQs';
import Support from '../components/molecules/settings/Support';
import AddBankModal from '../components/molecules/AddBankModal';
import { fetchBanks } from '../services/authService';
import Link from 'next/link';

function Page() {
  const [activeTab, setActiveTab] = useState("personal-info");
  const [showNav, setShowNav] = useState(true)
  const [bankList, setBankList] = useState([])
  const [loading, setLoading] = useState(true)
  const [addAccountModal, updateAddAccountModal] = useState(false)


  const fetch = async () => {
    setLoading(true)
    setBankList([])
    const { status, data } = await fetchBanks().catch(err => console.log(err))
    if (status) {
      setBankList(data.data[0]);
    }
    setLoading(false)
  }


  useEffect(() => {
    fetch()
  }, [])

  const settingsTabs = [
    {
      title: "Personal Info",
      id: "personal-info",
      asLink: false
    },
    {
      title: "Withdrawal Accounts",
      id: "withdrawal_accounts",
      asLink: false
    },
    {
      title: "Referrals",
      id: "referrals",
      asLink: false
    },
    {
      title: "Change Password",
      id: "change-password",
      asLink: false
    },
    {
      title: "Change Pin",
      id: "change-pin",
      asLink: false
    },
    {
      title: "Appearance",
      id: "appearance",
      asLink: false
    },
    {
      title: "About Mbwoy",
      id: "about-mbwoy",
      asLink: true,
      href: "https://mbwoyafrotech.com/about"
    },
    {
      title: "Privacy & Terms of Use",
      id: "pxt",
      asLink: true,
      href: "https://mbwoyafrotech.com/policy"
    },
    {
      title: "FAQs",
      id: "faqs",
      asLink: true,
      href: "https://mbwoyafrotech.com/service"
    },
    {
      title: "Support",
      id: "support",
      asLink: false
    },
    {
      title: "Delete Account",
      id: "delete-account",
      asLink: false
    },

  ];


  return (
    <AppLayout>
      <AddBankModal refresh={() => fetch()} close={() => updateAddAccountModal(false)} isOpen={addAccountModal} />
      <div className="text-xl">Settings</div>
      <div className="container relative lg:grid grid-cols-3 gap-3">
        <div className="">
          <div className="md:w-[80%] md:border dark:border-gray-700 border-[#F2F4F7] p-3 rounded-lg">
            {settingsTabs.map((tab, i) => (
              <div key={i}>
                {
                  tab.asLink ? (
                    <Link
                      target='_blank'
                      href={tab.href}
                    >
                      <div className={
                        activeTab === `${tab.id}`
                          ? `md:bg-[#fff] border-b dark:border-gray-600 dark:md:bg-gray-700 dark:text-white-1 md:border-none md:px-4 py-3 mb-2 md:rounded-lg md:text-[#344051] font-medium cursor-pointer md:[boxShadow:0px_2px_4px_0px_rgba(52,_64,_81,_0.12)]`
                          : `md:px-4 py-3 dark:text-white-1 dark:border-gray-600 dark:md:text-gray-300 border-b md:border-none mb-2 md:rounded-lg md:text-[#637083] font-medium cursor-pointer`
                      }>
                        <div className="flex items-center">
                          <div className="flex-grow">{tab.title}</div>
                          <div className=""><RxExternalLink /></div>
                        </div>
                      </div>

                    </Link>
                  ) : (
                    <div
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
                  )
                }
              </div>
            ))}
          </div>
        </div>
        <div className={`col-span-2 min-h-screen bg-gray-50 backdrop-blur-2xl bg-opacity-0 dark:bg-[#202B37] fixed lg:relative h-screen md:h-auto w-screen md:w-full top-0 ${showNav ? "-right-full lg:right-0" : "right-0"}`}>
          <div className="h-full md:h-auto col-span-2 pb-5 overflow-y-scroll ml-0 md:ml-72 lg:ml-0 md:overflow-y-auto">
            {activeTab === "personal-info" && <PersonalInfo reset={showNav} goBack={() => setShowNav(true)} />}
            {activeTab === "change-password" && <ChangePassword goBack={() => setShowNav(true)} />}
            {activeTab === "withdrawal_accounts" && <WithdrawalAccounts bankList={bankList} loading={loading} openModal={() => updateAddAccountModal(true)} goBack={() => setShowNav(true)} />}
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