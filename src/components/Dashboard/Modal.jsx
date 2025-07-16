import React, { useEffect } from "react";
import { IconX } from '@tabler/icons-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    document.body.classList[isOpen ? "add" : "remove"]("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <IconX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
