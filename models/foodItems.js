const mongoose = require('mongoose')

const foodItems = new mongoose.Schema({
      name: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true}
})

const items = mongoose.model('foodItems', foodItems)

module.exports = items