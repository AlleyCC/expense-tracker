const Record = require('../record')
const db = require('../../config/mongoose')



SEED_USER = {
  name: 'user_1',
  email: 'user1@exmaple.com',
  password: '12345678'
}

db.once('open', () => {
  console.log('MongoDB connected!')
  for (let i = 0; i < 10; i ++){
    Record.create({ 
      name: `看電影-${i}`,
      date: 2022-01-01,
      amount: 100,
      categoryId: "630d68fc41ffb31c82913b2d"
      userId: SEED_USER.password
    })
  }
  console.log('done with recordSeeder')
})

