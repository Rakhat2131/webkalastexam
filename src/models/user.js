const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});

exports.createUser = (username , password , role) => {
    return { username, password, role };
}

const User = mongoose.model('User', userSchema);

module.exports = User;
