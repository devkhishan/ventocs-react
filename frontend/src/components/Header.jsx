import Logo from '../assets/VentocsLogo.png'
import { useState } from 'react'; 
import Web3 from 'web3';


function Header() {
    const [isConnected, setIsConnected] = useState(false); 
    const [address,setAddress] = useState();
    const [balance,setBalance] = useState(80.23);
   

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
          alert('MetaMask is not detected. Please install or enable it.');
          return;
        }
      
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          const web3 = new Web3(window.ethereum);
          const balanceWei = await web3.eth.getBalance(accounts[0]);
          const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
          const roundedBalance = parseFloat(balanceEth).toFixed(3);
          setBalance(roundedBalance); 
          if (accounts && accounts.length > 0) { 
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Error connecting wallet:', error);
          alert('Error connecting wallet. Please make sure MetaMask is connected and unlocked.');
        }
    };
      
    const logout = () => {
        // Clear user-related information and log out
        setAddress('');
        setIsConnected(false);
    };

   
    return (
        <>
        <section className="header">
        <div id="logo">
            <img src={Logo} alt="Brand" />
        </div>
        <div id="search">
            <input type="text" id="search-box" />
            <i className="fa fa-search icons" aria-hidden="true"></i>
            <i className="fa fa-microphone icons" aria-hidden="true" ></i>
            <a><i className="fa fa-filter icons" aria-hidden="true"></i></a>

        </div> 
        {isConnected ? (
            <>
                <button id='connect-btn' >
                <i style={{paddingRight: '10px'}} className="fa-solid fa-wallet" aria-hidden="true" ></i>
                {address.slice(0,5)}.. | Balance: {balance}</button>
                
                <button id='connect-btn' onClick={logout}>
                
                Logout
                </button>
                
            </>
        ) : (
            <>
                <button id='connect-btn' onClick={connectWallet}>Connect</button>
            </>
        )} 

        
    
    </section>
    <hr />
    </>
    )
}

export default Header