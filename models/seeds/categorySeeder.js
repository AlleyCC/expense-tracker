const Category = require('../category')
const db = require('../../config/mongoose')

SEED_CATEGORY = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', () => {
  console.log('MongoDB connected!')
  for (let i = 0; i < 5; i ++){
    Category.create({name: SEED_CATEGORY[i]})
  }
  console.log('done with categorySeeder')
})
