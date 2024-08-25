// src/UserForm.js
import React, { useState } from 'react';

const UserForm = ({ walletAddress, onSuccess }) => {

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');


    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/create-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, bio, wallet_address: walletAddress }),
            });

            const result = await response.json();
            console.log(result);
            if (result.success) {
                alert('User created successfully');
                localStorage.setItem("walletAddress",result.wallet_address);
                onSuccess(result);
                // Redirect or update state as needed
            } else {
                alert('Failed to create user');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <h2>Complete Your Profile</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="text"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />

            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default UserForm;
