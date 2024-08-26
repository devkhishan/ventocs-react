import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const tokenAddress = 'YOUR_ERC20_TOKEN_CONTRACT_ADDRESS'; // Replace with your ERC20 contract address
const tokenABI = [/* Your ERC20 ABI here */]; // Replace with your ERC20 contract ABI

const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

export const donateTokens = async (postOwner, amount) => {
    const userAddress = localStorage.getItem('walletAddress');
    if (userAddress === postOwner) {
        alert("You can't donate to yourself!");
        return;
    }

    try {
        const amountInWei = web3.utils.toWei(amount, 'ether');
        await tokenContract.methods.transfer(postOwner, amountInWei).send({ from: userAddress });
        alert('Donation successful!');
    } catch (error) {
        console.error('Error during token transfer:', error);
        alert('Donation failed. Please try again.');
    }
};
