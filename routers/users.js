const mongoose = require('mongoose')
const limiter = require('express-rate-limit')
const express = require('express')
const routes = express.Router()
const { createClient, logClient } = require('../controller/users')
const { body } = require('express-validator')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

const rate = limiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'too many requests'
})

routes.get('/profile', auth, (req, res) => {
    res.json({ message: 'You are authenticated', user: req.user })
})

routes.post('/',
    body('email').isEmail().withMessage('please enter a valid mail'),
    body('password').isLength({ min:8 }).withMessage('must be 8 characters long')
    , createClient)

    routes.get('/admin', auth, authAdmin, (req, res) => {
    res.json({ message: 'You are authorized', user: req.user })
})


    routes.post('/login',
       body('email').isEmail().trim().escape().withMessage('please pass in a valid email'),
       body('password').isString().isLength({ min:8}).withMessage('must be 8 characters long') 
        , rate, logClient)
module.exports = routes