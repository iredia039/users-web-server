const mongoose = require('mongoose')

const user = new mongoose.Schema({
    email:{type: String, required:true},
    password:{type: String, required:true},
    role:{type: String,default: 'customer'}
})

const customer = mongoose.model('user', user)

module.exports = customer