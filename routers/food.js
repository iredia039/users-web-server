const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const { createFoodItem, getFoodItem, updateFoodItem, deleteFoodItem } = require('../controller/controller')

function checkFood(req, res, next) {
    console.log('checking food');
    next()
    
}


router.post('/', 
    body('name').notEmpty().withMessage('please add a name'),
    body('price').isNumeric().withMessage('add price and must be numbers'),
    body('description').notEmpty().withMessage('add this shii')
    , checkFood, createFoodItem)

router.get('/', getFoodItem)

router.put('/:id', 
        body('name').notEmpty().withMessage('please add a name'),
    body('price').isNumeric().withMessage('add price and must be numbers'),
    body('description').notEmpty().withMessage('add this shii')
    , updateFoodItem)

router.delete('/:id', deleteFoodItem)

module.exports = router