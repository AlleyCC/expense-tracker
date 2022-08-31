const express = require('express')
const session = require('express-session')
const { engine } = require('express-handlebars') 
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes/index')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000


app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'MySecretHaHa',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  console.log('req.isAuthenticated:', req.isAuthenticated())
  console.log('req.user:', req.user)
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() 
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, (req, res) => {
  console.log(`Running on http://localhost:${port}`)
})