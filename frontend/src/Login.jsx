import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const Login = ({onSuccess}) => {
    const [signature, setSignature] = useState('');
    const [account, setAccount] = useState('');
    const [message, setMessage] = useState('');
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
                    } else {
                        disconnectMetamask();
                        setConnected(false);
                    }
                    const wallet = localStorage.getItem('wallet');
                    const savedSignature = localStorage.getItem('signature');
                    if (wallet && savedSignature) {
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

    useEffect(() => {
        const sigCheck = localStorage.getItem('signature')
        if (connected && !sigCheck) {
            signMessage();
        }
    }, [connected]);

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



    const generateRandomSuffix = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    const signMessage = async () => {
        if(!connected){
            alert("Please connect metamask first")
            return
        }

        const nonce = generateRandomSuffix();
        const predefinedMessage = `Please sign this message to authenticate your identity. Nonce: ${nonce}`;
        setMessage(predefinedMessage);

        try {

            const signedMessage = await web3.eth.personal.sign(predefinedMessage, account, "");
            setSignature(signedMessage);
            if(signedMessage) {
                localStorage.setItem('walletAddress', account);
                localStorage.setItem('signature', signedMessage);
            }
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

            if (result.success) {
                onSuccess(result)
            } else {
                alert('Authentication failed');
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    const disconnectMetamask = () => {
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('signature');

        onSuccess({newUser:false, user:null});
        setConnected(false);
    }

    return (
        <div className="flex flex-col space-y-2 items-center">
            {!metamaskAvailable && (
                <p className="text-red-500">Please install MetaMask to use this app.</p>
            )}
            {!connected && (
                <button
                    className="bg-[#FFB000] text-black py-2 px-4 rounded-lg hover:bg-[#FFCC00] hover:text-black border border-[#FFB000] font-mono"
                    onClick={connectMetaMask}
                >
                    Connect MetaMask
                </button>
            )}
            {connected && (
                <div className="flex flex-col items-center">
                    <p className="text-sm text-[#FFB000] font-mono">Connected as: {localStorage.getItem('walletAddress')}</p>
                    <button
                        className="bg-[#FFB000] text-black py-2 px-4 rounded-lg hover:bg-[#FFCC00] hover:text-black border border-[#FFB000] font-mono mt-2"
                        onClick={disconnectMetamask}
                    >
                        Disconnect MetaMask
                    </button>
                </div>
            )}
        </div>
    );



};

export default Login;
