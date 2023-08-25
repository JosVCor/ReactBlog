const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "{PATH} must be present"],
    },
    email: {
        type: String,
        required: [true, "{PATH} must be present"],
    },
    password: {
        type: String,
        required: [true, "{PATH} must be present"],
    },
    isAdmin: {
        type: Boolean,
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;