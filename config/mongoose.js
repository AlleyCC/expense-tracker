const mongoose = require('mongoose')
const db = mongoose.connection
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log(err)
})

db.once('open', () => {
  
  console.log('MONGODB connected!')
})

module.exports = db