const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars') 
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/index')

require('./config/mongoose')

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)
app.listen(port, (req, res) => {
  console.log(`Running on http://localhost:${port}`)
})