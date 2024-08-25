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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default UserForm;
