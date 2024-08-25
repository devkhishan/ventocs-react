const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    wallet_address: { type: String, required: true },
    bio: { type: String },

});

userSchema.index({ email: 1 }, { sparse: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
