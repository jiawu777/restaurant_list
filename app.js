//載入express功能
const express = require('express')
const app = express()
const port = 3000

//呼叫樣板引擎express-handlebars
const exphbs = require('express-handlebars')

//呼叫json資料庫
const restaurantList = require('./restaurant.json')

//設定模板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//設定靜態檔案
app.use(express.static('public'))

//設定路由根目錄
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurantId', (req, res) => {
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
})
//接收server
app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})