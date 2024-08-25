import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const Auth = () => {
    const [signature, setSignature] = useState('');
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
    const [metamaskAvailable, setMetamaskAvailable] = useState(true);
    const [connected, setConnected] = useState(false);
    const messageSigned = useRef(false); // Ref to track signing state

    useEffect(() => {
        const checkMetaMask = async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        setConnected(true);
                    } else {
                        setConnected(false);
                    }
                    const savedSignature = sessionStorage.getItem('signature');
                    if (savedSignature) {
                        setSignature(savedSignature);
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

        } catch (error) {
            console.error('User denied account access:', error);
        }
    };

    useEffect(() => {
        if (connected && !signature) {
            signMessage();

        }
    }, [connected]);

    const generateRandomSuffix = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    const signMessage = async () => {
        if (!connected) {
            alert('Please connect MetaMask first.');
            return;
        }
        const nonce = generateRandomSuffix();
        const predefinedMessage = `Please sign this message to authenticate your identity. Nonce: ${nonce}`;
        setMessage(predefinedMessage);

        try {

            const signedMessage = await web3.eth.personal.sign(predefinedMessage, account, "");
            setSignature(signedMessage);
            sessionStorage.setItem('signature', signedMessage);
            await authenticateUser(predefinedMessage, signedMessage, account);
        } catch (error) {
            console.error('Error signing message:', error);
        }
    };

    const authenticateUser = async (message, signature, account) => {
        try {
            const response = await fetch('http://localhost:5000/api/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, signature, account }),
            });
            const result = await response.json();
            console.log(result);
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
                    <button onClick={signMessage} disabled={messageSigned.current}>Sign Predefined Message</button>
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
