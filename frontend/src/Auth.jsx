import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const Auth = () => {
    const [signature, setSignature] = useState('');
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('Please sign this message to authenticate your identity.');
    const [metamaskAvailable, setMetamaskAvailable] = useState(true);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const checkMetaMask = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        setConnected(true);
                        const savedSignature = sessionStorage.getItem('signature');
                        if (savedSignature) {
                            setSignature(savedSignature);
                        } else {
                            await signMessage(accounts[0]);
                        }
                    } else {
                        setConnected(false);
                    }
                } catch (error) {
                    console.error('Error checking MetaMask connection:', error);
                    setConnected(false);
                }
            } else {
                setMetamaskAvailable(false);
            }
        };

        checkMetaMask();
    }, []);

    const connectMetaMask = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed. Please install MetaMask to use this app.');
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
            setConnected(true);
            await signMessage(accounts[0]);  // Trigger signing after connection
        } catch (error) {
            console.error('User denied account access:', error);
        }
    };

    const signMessage = async (account) => {
        try {
            const signedMessage = await web3.eth.personal.sign(message, account, '');
            setSignature(signedMessage);
            sessionStorage.setItem('signature', signedMessage);
            await authenticateUser(message, signedMessage, account);
        } catch (error) {
            console.error('Error signing message:', error);
        }
    };

    const authenticateUser = async (message, signature, account) => {
        try {
            const response = await fetch('/api/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, signature, account }),
            });
            const result = await response.json();
            if (result.success) {
                alert('Authentication successful');
            } else {
                alert('Authentication failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <div>
            {!metamaskAvailable && <p>Please install MetaMask to use this app.</p>}
            {!connected ? (
                <button onClick={connectMetaMask}>Connect MetaMask</button>
            ) : (
                <div>
                    <p>Connected as: {account}</p>
                    <button onClick={() => signMessage(account)} disabled={!!signature}>
                        {signature ? 'Already Signed' : 'Sign Predefined Message'}
                    </button>
                </div>
            )}
            <div>
                <p>Message: {message}</p>
                <p>Signature: {signature}</p>
            </div>
        </div>
    );
};

export default Auth;
