const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//連線到新增頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

//新增一筆資料
router.post('', (req, res) => {
    const restaurant = new Restaurant(req.body)
    return restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

//瀏覽特定資料
router.get('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(error => console.error(error))
})

//顯示特定資料編輯頁面
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.error(error))
})

//修改特定資料
router.put('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findByIdAndUpdate(id, req.body)
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.error(error))
})

//刪除特定資料
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then((restaurant) => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})




module.exports = router