const express = require('express')
const router = express.Router()

const home = require('./module/home')
const restaurants = require('./module/restaurants')
const users = require('./module/users')
const auth = require('./module/auth')
const { authenticator } = require('../middleware/auth')


router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home) //如果request路徑是 / ，就執行modules/home裡的程式碼
module.exports = router