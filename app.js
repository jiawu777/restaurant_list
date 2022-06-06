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


//瀏覽所有餐廳(首頁)
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})


/*app.get('/restaurants/:restaurantId', (req, res) => {
    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurantId)
    res.render('show', { restaurant: restaurant })
})
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