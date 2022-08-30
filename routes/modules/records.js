const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
//create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, date, amount, category } = req.body
  Category.findOne({ category })
    .then(category => {
      const categoryId = category._id
      return Record.create({ 
        name, 
        date, 
        amount, 
        categoryId
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  
  console.log(req.body)
})

//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      const categoryId = record.categoryId
      return Category.findById(categoryId)
        .lean()
        .then(data => {
          const category = data.name
          res.render('edit', { record, category })
        })
    })
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
  const { name, date, category, amount } = req.body
  const id = req.params.id
  Category.findOne({ category })
    .then(category => {
      const categoryId = category._id
      return Record.findById(id)
                  .then(record => {
                    console.log('categoryId', categoryId)
                    record.name = name
                    record.date = date
                    record.amount = amount
                    record.categoryId = categoryId
                    return record.save()
                  })
                  .then(() => res.redirect('/'))
                  .catch(err => console.log(err))
    }) 
    .catch(err => console.log(err)) 
})


//delete

module.exports = router