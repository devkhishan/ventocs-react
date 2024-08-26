
import React, { useState, useEffect } from 'react';
import Login from './Login';
import UserForm from './UserForm';
import Post from "./Post.jsx";

const Auth = () => {
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [newUser, setNewUser] = useState(false);

    const isAuthenticated = () => {
        const address = localStorage.getItem('walletAddress');
        const signature = localStorage.getItem('signature');

        return (address && signature)
    }

    const handleAuthSuccess = (currUser) => {

        setNewUser(currUser.newUser);
        setUser(currUser.user);
        setWallet(currUser.wallet_address);

    };

    const handleNewUser = (currUser) => {
        setNewUser(false);
        setUser(currUser.user);
    }
    return (
        <div className="bg-black text-[#FFB000] font-mono min-h-screen flex">
            {/* First Column */}
            <div className="w-1/4 p-4 border-r border-darkAmber">
                <div className="text-xl font-bold">
                    <span className="text-lg ">Ventocs</span>
                </div>
            </div>

            {/* Second Column */}
            <div className="w-1/2 p-4">
                {isAuthenticated() && <Post />}
            </div>

            {/* Third Column */}
            <div className="w-1/4 p-4 border-l border-darkAmber">
                <Login onSuccess={handleAuthSuccess} />
            </div>
        </div>
    );

};

export default Auth;
