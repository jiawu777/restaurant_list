const express = require('express')
const router = express.Router()

const home = require('./module/home')
const restaurants = require('./module/restaurants')
const users = require('./module/users')
router.use('/', home) //如果request路徑是 / ，就執行modules/home裡的程式碼
router.use('/restaurants', restaurants)
router.use('/users', users)
module.exports = router