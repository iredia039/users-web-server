const mongoose = require('mongoose')
const items = require('../models/foodItems')
const users = require('../models/user')




async function createFood(data) {
   const food = await items.create(data)
   return food
}

async function getFood(data) {
    const food = await items.find(data)
    return food
}

async function updateFood(id, data) {
    const food = await items.findByIdAndUpdate(id, data, { new: true })
    return food
}

async function deleteFood(id, data) {
    const food = await items.findByIdAndDelete(id, data)
    return food
}

module.exports = { createFood, getFood, updateFood, deleteFood }