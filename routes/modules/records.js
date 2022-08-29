const express = require('express')
const router = express.Router()

//create
router.get('/new', (req, res) => {
  res.render('new')
})
//edit
router.get('/edit', (req, res) => {
  res.render('/edit')
})
//delete

module.exports = router