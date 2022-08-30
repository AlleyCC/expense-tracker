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
  Category.findOne({category })
    .then(category => {
      const categoryId = category._id
      console.log(categoryId)
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
router.post('/edit', (req, res) => {
  res.render('/edit')
})
//delete

module.exports = router