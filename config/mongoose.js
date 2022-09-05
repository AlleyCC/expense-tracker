const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('MONGODB error!')
})

db.once('open', () => {
  console.log('MONGODB connected!')
})

module.exports = db