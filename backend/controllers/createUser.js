// controllers/createUser.js
const User = require('../models/userModel');

const createUser = async (req, res) => {

    const { username , wallet_address, bio } = req.body;

    console.log(wallet_address);
    // Validate required fields

    if (!username || !wallet_address) {
        return res.status(400).json({ success: false, message: 'Username and wallet address are required.' });
    }

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }

        // Create new user with optional fields set to null if not provided
        const newUser = new User({

            username,
            wallet_address,
            bio: bio || null,

        });


        await newUser.save();

        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = createUser;
