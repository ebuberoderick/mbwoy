import React from 'react'
import Modal from '../organisms/Modal'
import AppInput from '../organisms/AppInput'

function AddBankModal({isOpen,close}) {
    return (
        <div>
            <Modal closeModal={close} isOpen={isOpen}>
                <div className="space-y-4">
                    <AppInput name="email" required label="Account Number" />
                    <AppInput name="email" required label="Bank Name" />
                    {/* <div className="text-right">dfg</div> */}
                    <div className="flex gap-3">
                        <button className="flex-grow disabled:bg-opacity-35 shadow-md bg-black text-white rounded-lg py-3">Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddBankModal