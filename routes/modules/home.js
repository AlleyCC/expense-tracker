const express = require('express')
const router = express.Router()
const Records = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  return Records.find({userId})
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

//search
//sort


module.exports = router