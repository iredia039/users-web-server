const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { createUser, logUser } = require('../service/user-service')


async function createClient(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = req.body
        const users = await createUser(user)
        res.send(users)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

async function logClient(req, res, next) {
    const error = validationResult(req)

        if (!error.isEmpty()) {
             return res.status(400).json({ error: error.array() })
    }

    try {
        const { email, password } = req.body
        const user = await logUser(email, password)
        const token = jwt.sign({ id: user._id, role:user.role}, process.env.JWT_SECRET)
        res.send({ token })
    } catch (error) {
                console.error(error)
        next(error)
    }
}

module.exports = { createClient, logClient }