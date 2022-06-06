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
    },
    name_en: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    location: {
        type: String,
    },
    phone: {
        type: String,
    },
    google_map: {
        type: String,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
})


module.exports = mongoose.model('Restaurant', restaurantSchema)