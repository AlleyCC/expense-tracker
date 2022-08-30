const express = require('express')
const router = express.Router()
const Records = require('../../models/record')
router.get('/', (req, res) => {
  
  return Records.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

//search
//sort


module.exports = router