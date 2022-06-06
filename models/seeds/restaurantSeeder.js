//呼叫json資料庫
const restaurantList = require('../../restaurant.json').results

//載入Restaurant Model
const Restaurant = require('../restaurant')

//呼叫Mongoose資料庫
const mongoose = require('mongoose')

//mongoose連線
mongoose.connect(process.env.MONGODB_URI)

//設定mongoose連線狀態
const db = mongoose.connection

//連線失敗
db.on('error', () => {
    console.log('mongoose error!')
})

//連線成功
db.once('open', () => {
    console.log('mongoose connected!')
    Restaurant.create(restaurantList)
        .then(() => {
            console.log('restaurantSeeder done!')
        })
        .catch(error => console.error(error))
})