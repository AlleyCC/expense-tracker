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
      Promise.all(Array.from({length: 5}, (_, i) => {
        categories.push(category[i]._id)
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
          console.log(userId)
          Promise.all(Array.from({length: 15}, (_, i) => {
            return Record.create({
              name: `看電影-${i}`,
              date: 2022-09-01,
              amount: 100,
              categoryId: categories[i%5],
              userId
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

