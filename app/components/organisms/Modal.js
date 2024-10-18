import React from "react";

const Modal = ({promt,closeModal , isOpen, children, size }) => {

  if (!isOpen) return null;
  return (
    <div>
      <div className="fixed inset-0 sm:p-3 z-50 flex overflow-auto items-end sm:items-center bottom-0 justify-center backdrop-blur-md bg-white bg-opacity-5">
        <div className={`relative bg-white rounded-t-3xl sm:rounded-lg shadow-lg w-full ${size === "sm" ? "sm:max-w-sm" : size === "md" ? "sm:max-w-md" : size === "lg" ? "sm:max-w-lg" : size === "xl" ? "sm:max-w-xl" : size === "2xl" ? "sm:max-w-2xl" : size === "3xl" ? "sm:max-w-3xl" : "sm:max-w-sm"} mx-auto`}>
        {!promt && <div className="absolute w-10 h-10 top-0 right-0 rounded-full flex items-center cursor-pointer justify-center" onClick={() => closeModal()}><i className="ri-close-large-line"></i></div>}
          <div className="sm:px-8 sm:py-10 px-4 pb-6 pt-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
