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
router.get('/sort', (req, res) => {
  const householdSelected = 'selected'
  const userId = req.user._id
  const sort = req.query.sort
  let totalAmount = 0
  if (sort === 'household') {
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
          res.render('index', { records, householdSelected: 'selected', totalAmount })
        }) 
    })
  } else if (sort === 'traffic') {
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
          res.render('index', { records, trafficSelected: 'selected', totalAmount })
        }) 
    })
  } else if (sort === 'entertainment') {
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
          res.render('index', { records, entertainmentSelected: 'selected', totalAmount })
        }) 
    })
  } else if (sort === 'food') {
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
          res.render('index', { records, foodSelected: 'selected', totalAmount })
        }) 
    })
  } else if (sort === 'others') {
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
          res.render('index', { records, othersSelected: 'selected', totalAmount })
        }) 
    })
  }
  
})




module.exports = router