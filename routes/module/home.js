const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//顯示首頁
router.get('/', (req, res) => {
    const sortBy = req.query['sort-by']
    const order = Number(req.query.order)

    Restaurant.find()
        .lean()
        .sort({ [sortBy]: order })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

})

//search功能get
router.get('/search', (req, res) => {
    //問題點1
    /*if (!req.query.keyword) {
        res.redirect('/')
    }*/
    const input = req.query.keyword
    const keyword = input.split(" ").join("").toLowerCase()
    const noResultMessage = "查無資料，請更換關鍵字或點擊放大鏡回到首頁"
    return Restaurant.find({})
        .lean()
        .then(restaurants => {
            const filteredRestaurants = restaurants.filter((item) => {
                return item.name.toLowerCase().includes(keyword) || item.category.includes(keyword)
            })
            filteredRestaurants.length ? res.render('index', { restaurants: filteredRestaurants, keyword: input }) : res.render('index', { noResultMessage, keyword: input })
        })
        .catch(error => console.error(error))
})

module.exports = router



