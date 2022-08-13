const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//顯示首頁
router.get('/', (req, res) => {
    //const sortBy = data.sortBy
    //const order = data.sortType

    Restaurant.find()
        .lean()
        .sort({ name: '1' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

})

//search功能get
router.get('/search', (req, res) => {
    /*if (!req.query.keyword) {
        res.redirect('/')//問題點
    }*/
    const keyword = req.query.keyword.trim().toLowerCase()
    const noResultMessage = "查無資料，請更換關鍵字或點擊放大鏡回到首頁"
    Restaurant.find()
        .lean()
        .then(restaurants => {
            const filteredRestaurants = restaurants.filter((item) => {
                return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword)
            })
            filteredRestaurants.length ? res.render('index', { restaurants: filteredRestaurants, keyword: keyword }) : res.render('index', { noResultMessage, keyword })
        })

        .catch(error => console.error(error))
})

module.exports = router



