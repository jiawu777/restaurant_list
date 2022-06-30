//載入body-parse把URL-encoded轉譯成req.body物件
const bodyParser = require('body-parser')

//載入Restaurant Model
const Restaurant = require('./models/restaurant')

//載入express功能
const express = require('express')
const app = express()
const port = 3000

//呼叫樣板引擎express-hbs
const exphbs = require('express-handlebars')

//呼叫Mongoose資料庫
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')

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
})

//設定模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定靜態檔案(未更動)
app.use(express.static('public'))

//用app.use規定每筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//瀏覽所有餐廳(首頁)
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

//新增new頁面
app.get('/restaurants/new', (req, res) => {
    res.render('new')
})

//新增一筆餐廳資料
app.post('/restaurants', (req, res) => {
    console.log(req.body)
    Restaurant.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))

})

//瀏覽特定資料
app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('detail', { restaurant }))
        .catch(error => console.error(error))

})

//修改特定資料

//進入edit頁面
app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.error(error))

})
//上傳修改資料
/*
app.post('/restaurants/:id/edit', (req, res) => {
    const editItem = req.body
    const id = req.params.id
    return Restaurant.findById(id)
        .then(editItem =>
            restaurant.editItem)
})*/

/*
//search功能get
app.get('/search', (req, res) => {
    const keyword = req.query.keyword.toLowerCase()
    const restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword)
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })
})*/
//接收server
app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})