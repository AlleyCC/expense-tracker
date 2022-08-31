const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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
      const errors = []
      //error messages
      if (password !== passwordConfirm) {
        errors.push({ message: 'Password and confirm password are different.'})
      }
      if (!name || !email || !password || !passwordConfirm) {
        errors.push({ message: 'All fields are required.'})
      }
      if (errors.length) {
        return res.render('register', { 
          name,
          email,
          password,
          passwordConfirm,
          errors
         })
      }
      //registration status
      if (user) {    //if registered
        errors.push({ message: 'This email has been registered. Login now!' })
        return res.render('register', {   
          name,
          email,
          password,
          passwordConfirm,
          errors
        })
      }
      //if not registered yet
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          User.create({  
                  name,
                  email,
                  password: hash
            })
            .then(() =>  res.redirect('/'))
            .catch(err=> console.log(err))
        })
        .catch(err => console.log(err)) 
    })
    .catch(err => console.log(err))
})


//logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return next(err)
  })
  req.flash('success_msg', 'Successfully Logout!')
  res.redirect('/users/login')
})

module.exports = router