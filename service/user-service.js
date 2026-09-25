const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const users = require('../models/user')

async function createUser(data) {
    const pass = await bcrypt.hash(data.password, 10)
    data.password = pass
    const user = await users.create(data)
    return user
}

async function logUser(email, password) {
    const user = await users.findOne({ email })

    if (!user) {
        throw new Error("user not found");
        
    }

    const pass = await bcrypt.compare(password, user.password)

    if (!pass) {
        throw new Error("invalid password");
        
    }

    return user
}

module.exports = { createUser, logUser }
