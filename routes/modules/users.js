const express = require('express')
const router = express.Router()
const User = require('../../models/user')

//login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.render('/')
})


//register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  res.render('register')
})


//logout
router.get('/logout', (req, res) => {
  req.logout((err) => console.log(err))
})

module.exports = router