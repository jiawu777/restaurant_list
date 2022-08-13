//呼叫json資料庫
const restaurantList = require('../../restaurant.json').results

//載入Restaurant Model
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

//連線成功
db.once('open', () => {
    Restaurant.create(restaurantList)
        .then(() => {
            console.log('restaurantSeeder done!')
        })
        .catch(error => console.error(error))
})