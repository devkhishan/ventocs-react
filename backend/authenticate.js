const {Web3} = require('web3');
const { ALCHEMY_API_KEY } = process.env;

const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);

const authenticate = async (req, res) => {
    const { message, signature, account } = req.body;

    try {
        // Recover the address from the signature
        const recoveredAddress = web3.eth.accounts.recover(message, signature);

        if (recoveredAddress.toLowerCase() === account.toLowerCase()) {
            // Valid signature
            res.json({ success: true });
        } else {
            // Invalid signature
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ success: false, message: 'Authentication error' });
    }
};

module.exports = authenticate;
