const Record = require('../recordSeeder')
const Category = require('../categorySeeder')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('MongoDB connected!')
})