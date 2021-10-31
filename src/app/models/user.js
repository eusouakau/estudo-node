const mongoose = require('../../db');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true, 
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    //encriptar a senha
   const hash = await bcrypt.hash(this.password, 10);
   this.password = hash;

   next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;