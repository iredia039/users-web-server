require('dotenv').config()

const helmet = require('helmet')
const sanitize = require('express-mongo-sanitize')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const foodItems = require('./routers/food')
const users = require('./routers/users')
const app = express()
const mongoose = require('mongoose')



mongoose.connect(process.env.MONGODB_URI, { family: 4 })
.then(() => console.log('connection successful'))
.catch((err) => console.error('connection failed', err))
app.use(morgan('dev'))

app.use(helmet())
app.use(sanitize())
function middleWare(req, res, next) {
    console.log('item received');
    next()
}
app.use(cors(
     origin: ['https://school-portal-pi-rosy.vercel.app']
))
app.use(middleWare)

app.use(express.json())

app.use('/food-items', foodItems)

app.use('/users', users)

app.get('/', (req, res) => {
    res.send('active')
})

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.name === 'ValidationError' ? 400 : 500).json({error: err.message})
    
}

app.use(errorHandler)

app.listen(3000)