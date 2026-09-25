const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const { createFood, getFood, updateFood, deleteFood, createUser } = require('../service/service')




async function createFoodItem(req, res, next) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    } else {
            try {
        // 1. pull data out
        const body = req.body
        // 2 & 3. call service, await it
        const food = await createFood(body)
        // 4. send response
        res.send(food)
    } catch (error) {
        // 5. handle failure
        console.error(error)
        next(error)
        
        
    }
    }

}

async function getFoodItem(req, res, next) {
     try {
            const food = await getFood()
    res.send(food)
    } catch (error) {
        console.error(error)
        next(error)
        
        
    }
}

async function updateFoodItem(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
    }
    try {
        const id = req.params.id
        const body = req.body
        const food = await updateFood(id, body)
        res.send(food)
    } catch (error) {
        console.error(error)
        next(error)
        
    }
}

async function deleteFoodItem(req, res, next) {
    try {
            const id = req.params.id
    const body = req.body
    const food = await deleteFood(id, body)
    res.send(food)
    } catch (error) {
        console.error(error)
        next(error)
        
    }
}

module.exports = { createFoodItem, getFoodItem, updateFoodItem, deleteFoodItem }