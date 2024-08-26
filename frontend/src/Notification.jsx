import React from 'react';

const Notification = ({ message, type, onClose }) => {
    const baseClasses = "fixed bottom-4 right-4 z-50 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ";
    const typeClasses = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
    };

    if (!message) return null;

    return (
        <div className={`${baseClasses} ${typeClasses[type]} opacity-100`}>
            <div className="flex items-center">
                <div className="flex-grow">{message}</div>
                <button
                    onClick={onClose}
                    className="ml-4 text-xl font-bold focus:outline-none"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Notification;
