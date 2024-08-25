// src/Auth.js
import React, { useState, useEffect } from 'react';
import Login from './Login';
import UserForm from './UserForm';

const Auth = () => {
    const [user, setUser] = useState(null);
    const [wallet, setWallet] = useState(null);
    const [newUser, setNewUser] = useState(false);


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
        <div className="bg-vintage-gray text-vintage-blue font-mono min-h-screen">
            <nav className="flex justify-between items-center p-4 border-b border-vintage-blue bg-vintage-gray">
                <div className="text-xl font-bold">
                    <span className="text-lg">Ventocs</span>
                </div>
                <div>
                    <Login onSuccess={handleAuthSuccess}/>
                </div>
            </nav>
            <div className="flex justify-center items-center min-h-screen">
                {newUser && <UserForm walletAddress={wallet} onSuccess={handleNewUser}/>}
            </div>
        </div>
    );
};

export default Auth;
