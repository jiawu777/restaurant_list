//呼叫mongoose
const mongoose = require('mongoose')

//載入body-parse把URL-encoded轉譯成req.body物件
const bodyParser = require('body-parser')

//載入method override
const methodOverride = require('method-override')

//載入Restaurant Model
const Restaurant = require('./models/restaurant')

//載入express功能
const express = require('express')
const app = express()
const port = 3000

//連線到mongoose
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
})


//呼叫樣板引擎express-hbs
const exphbs = require('express-handlebars')
const { findByIdAndUpdate } = require('./models/restaurant')

//設定模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定靜態檔案(未更動)
app.use(express.static('public'))

//用app.use規定每筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//顯示首頁
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

})

//連線到新增頁面
app.get('/restaurants/new', (req, res) => {
    return res.render('new')
})

//新增一筆資料
app.post('/restaurants', (req, res) => {
    const restaurant = new Restaurant(req.body)
    return restaurant.save()
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})

//瀏覽特定資料
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(error => console.error(error))
})

//顯示特定資料頁面
app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then(restaurant => res.render('edit', { restaurant }))
        .catch(error => console.error(error))
})

//修改特定資料
app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findByIdAndUpdate(id, req.body)
        .then(restaurant => { return restaurant.save() })
        .then(() => res.redirect(`/restaurants/${id}/`))
        .catch(error => console.error(error))
})

//刪除特定資料
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then((restaurant) => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})


//search功能get
app.get('/search', (req, res) => {

    const keyword = req.query.keyword.trim().toLowerCase()
    console.log(keyword)
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

//接收server
app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})