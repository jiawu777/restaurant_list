//呼叫json資料庫
const restaurantList = require('./restaurant.json')

//呼叫Mongoose資料庫
const mongoose = require('mongoose')

//設定Schema
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    name_en: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: URL,
    },
    location: {
        type: String,
    },
    phone: {
        type: String,
    },
    google_map: {
        type: URL,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
})


module.exports = mongoose.model('Restaurant', restaurantSchema)