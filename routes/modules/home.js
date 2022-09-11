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
const sortOptions = {
  household: { name: '家居物業' },
  traffic: { name: '交通出行' },
  entertainment: { name: '休閒娛樂' },
  food: { name: '餐飲食品' },
  others: { name: '其他' }
}
router.get('/sort', (req, res) => {
  // const sort = req.query.sort
  const sortOption = sortOptions[req.query.sort]
  console.log('req.query.sort', req.query.sort)
  if (!sortOption) {
    return res.redirect('/')
  } else {
    const userId = req.user._id
    let totalAmount = 0
    console.log('找到分類標籤',sortOption)
    Category.find(sortOption)
      .lean()
      .then(categoryData => {
        console.log(categoryData)
        const categoryId = categoryData[0]._id
        Records.find({ categoryId, userId })
          .lean()
          .then(records => {
            records.map(record => {
            totalAmount += record.amount
            })
            res.render('index', { records, sortOption: req.query.sort, totalAmount })
          })
      })
  }  
})




module.exports = router