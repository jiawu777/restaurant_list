const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//連線到新增頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

//新增一筆資料
router.post('/', (req, res) => {
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    const userId = req.user._id
    return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//瀏覽特定資料
router.get('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(error => console.log(error))
})

//顯示特定資料編輯頁面
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Restaurant.findOne({ _id, userId })
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.error(error))
})

//修改特定資料 出現一長串有關_id的cast error????
router.put('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Restaurant.findOneAndUpdate({ _id, userId }, req.body)
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(error => console.error(error))
})

//刪除特定資料
router.delete('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    return Restaurant.findOne({ _id, userId })
        .then((restaurant) => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})




module.exports = router