const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log(err)
})

db.once('open', () => {
  console.log(process.env.MONGODB_URI)
  console.log('MONGODB connected!')
})

module.exports = db