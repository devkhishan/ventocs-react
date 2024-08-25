// controllers/authenticate.js
const {Web3} = require('web3');
const { ALCHEMY_API_KEY } = process.env;

// Initialize Web3 with Alchemy provider
const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
const User = require('../models/userModel'); // Ensure the path is correct

const authenticate = async (req, res) => {
    const { message, signature, account } = req.body;

    try {
        // Recover the address from the signature
        const recoveredAddress = web3.eth.accounts.recover(message, signature);

        // Check if the recovered address matches the provided account
        if (recoveredAddress.toLowerCase() !== account.toLowerCase()) {
            return res.status(401).json({ success: false, message: 'Invalid signature.' });
        }

        // Valid signature, proceed to check user existence
        const user = await User.findOne({ wallet_address: account });

        if (!user) {
            // User does not exist, send response to prompt for additional details
            return res.status(200).json({ success: true, newUser: true, wallet_address: account, user:null});
        }

        // User exists, authentication successful

        res.status(200).json({ success: true, newUser: false, wallet_address: account, user });

    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = authenticate;
