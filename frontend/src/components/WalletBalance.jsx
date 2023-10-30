import { useState } from 'react'; 
import Web3 from 'web3';

function WalletBalance(){
    const [balance, setBalance] = useState(); 

    const checkBalance = async () => {
        if (typeof window.ethereum === 'undefined') {
          alert('MetaMask is not detected. Please install or enable it.');
          return;
        }
    
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const selectedAddress = accounts[0];
    
          const web3 = new Web3(window.ethereum);
          const balanceWei = await web3.eth.getBalance(selectedAddress);
          const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
          const roundedBalance = parseFloat(balanceEth).toFixed(3);
          setBalance(roundedBalance);
        } catch (error) {
          console.error('Error checking balance:', error);
          alert('Error checking balance. Please make sure MetaMask is connected and unlocked.');
        }
      };

    return (
        <>
        <h2> Your Balance : {balance}</h2>
        <button onClick={checkBalance}>Show Balance</button>
        </>
    )
}

export default WalletBalance; 
