const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
//login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login' 
  })
)


//register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //const userId = req.user._id
  const { name, email, password, passwordConfirm } = req.body
  console.log('req.body', req.body)
  User.findOne({ email })
    .then(user => {

      if (user) {
        console.log('user exists')
        return res.render('register', {   //if registered
          name,
          email,
          password,
          passwordConfirm
        })
      } else {
        console.log('create user')
        return User.create({  //if not registered yet
          name,
          email,
          password
        })
          .then(() =>  res.redirect('/'))
          .catch(err=> console.log(err))
      }
    })
    .catch(err => console.log(err))
})


//logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
  })
  res.redirect('/users/login')
})

module.exports = router