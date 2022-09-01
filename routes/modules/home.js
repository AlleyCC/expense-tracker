const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const nothingSelected = 'selected'
  const userId = req.user._id
  let totalAmount = 0
  Records.find({userId})
    .lean()
    .then(records => {
      records.map(record => {
        totalAmount += record.amount
      })
      return res.render('index', { records, nothingSelected, totalAmount })
    })
})

//search
//sort
router.get('/sort_household', (req, res) => {
  const householdSelected = 'selected'
  const userId = req.user._id
  let totalAmount = 0
  Category.find({name: '家居物業'})
    .lean()
    .then(categoryData => {
      const categoryId = categoryData[0]._id
      Records.find({categoryId, userId})
        .lean()
        .then(records => {
          records.map(record => {
            totalAmount += record.amount
          })
          res.render('index', { records, householdSelected, totalAmount })
        }) 
    })
})

router.get('/sort_traffic', (req, res) => {
  const trafficSelected = 'selected'
  const userId = req.user._id
  let totalAmount = 0
  Category.find({name: '交通出行'})
    .lean()
    .then(categoryData => {
      const categoryId = categoryData[0]._id
      Records.find({categoryId, userId})
        .lean()
        .then(records => {
          records.map(record => {
            totalAmount += record.amount
          })
          res.render('index', { records, trafficSelected, totalAmount })
        }) 
    })
})

router.get('/sort_entertainment', (req, res) => {
  const entertainmentSelected = 'selected'
  const userId = req.user._id
  let totalAmount = 0
  Category.find({name: '休閒娛樂'})
    .lean()
    .then(categoryData => {
      const categoryId = categoryData[0]._id
      Records.find({categoryId, userId})
        .lean()
        .then(records => {
          records.map(record => {
            totalAmount += record.amount
          })
          res.render('index', { records, entertainmentSelected, totalAmount })
        }) 
    })
})

router.get('/sort_food', (req, res) => {
  const foodSelected = 'selected'
  const userId = req.user._id
  let totalAmount = 0
  Category.find({name: '餐飲食品'})
    .lean()
    .then(categoryData => {
      const categoryId = categoryData[0]._id
      Records.find({categoryId, userId})
        .lean()
        .then(records => {
          records.map(record => {
            totalAmount += record.amount
          })
          res.render('index', { records, foodSelected, totalAmount })
        }) 
    })
})

router.get('/sort_others', (req, res) => {
  const othersSelected = 'selected'
  const userId = req.user._id
  let totalAmount = 0
  Category.find({name: '其他'})
    .lean()
    .then(categoryData => {
      const categoryId = categoryData[0]._id
      Records.find({categoryId, userId})
        .lean()
        .then(records => {
          records.map(record => {
            totalAmount += record.amount
          })
          res.render('index', { records, othersSelected, totalAmount })
        }) 
    })
})


module.exports = router