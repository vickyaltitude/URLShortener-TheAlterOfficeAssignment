
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    googleId : {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    picture:{
        type: String
    }
})

module.exports = mongoose.model('Users',Users)