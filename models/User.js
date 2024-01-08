const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName:{
        type:String,
        required:true
    },    
    phoneNumber:{
        type:String,
        required:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    latitude:{
        type:Number,
        required:false,
        default:0.0
    },
    longitude:{
        type:Number,
        reuqired:false,
        default:0.0
    },
    token:{
        type:String,
        required:false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;