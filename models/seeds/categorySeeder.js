const Category = require('../category')
const db = require('../../config/mongoose')

SEED_CATEGORY = [{
  'name': '家居物業',
  'icon': 'fa-solid fa-house'
  },{
  'name': '交通出行',
  'icon': 'fa-solid fa-van-shuttle'
  },{
  'name': '休閒娛樂',
  'icon': 'fa-solid fa-face-grin-beam'
  },{
  'name': '餐飲食品',
  'icon': 'fa-solid fa-utensils'
  },{
  'name': '其他',
  'icon': 'fa-solid fa-pen'
  }]

db.once('open', () => {
  console.log('MongoDB connected!')
  for (let i = 0; i < 5; i ++){
    Category.create(SEED_CATEGORY[i])
  }
  console.log('done with categorySeeder')
})
