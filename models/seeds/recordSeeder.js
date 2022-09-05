const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const db = require('../../config/mongoose')


SEED_USER = {
  name: 'user_1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', () => {
  console.log('MongoDB connected!')
  const {name, email, password} = SEED_USER
  Category.find()
    .then(category => {
      const categories = []
      const icons = []
      Promise.all(Array.from({length: 5}, (_, i) => {
        categories.push(category[i]._id)
        icons.push(category[i].icon)  
      }))
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          return User.create({
            name,
            email,
            password: hash
          })
        })
        .then(user => {
          const userId = user._id
          Promise.all(Array.from({length: 15}, (_, i) => {
            return Record.create({
              name: `消費事項-${i}`,
              date: `2022-09-${10 + i}`,
              amount: 100 + 10 * i,
              categoryId: categories[i%5],
              userId,
              icon: icons[i%5]
            })
          }))
        .then(() => {
          console.log('done with recordSeeder')
          process.exit()
        })
    })
    })
  }
)

