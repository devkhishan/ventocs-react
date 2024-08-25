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
        <div>
            <Login onSuccess={handleAuthSuccess} />
            {newUser && <UserForm walletAddress={wallet} onSuccess={handleNewUser} />}


        </div>
    );
};

export default Auth;
