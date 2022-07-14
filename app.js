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

//呼叫樣板引擎express-hbs
const exphbs = require('express-handlebars')

//取用資料庫
const restaurant = require('./models/restaurant')

//載入mongoose
require('./config/mongoose')

//設定模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定靜態檔案(未更動)
app.use(express.static('public'))

//用app.use規定每筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//用app.use先跑 method override(function) 跑路由，只要網址帶有_method參數，就可以使用http方法(可用POST跟DELETE)呼叫
app.use(methodOverride('_method'))

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
app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findByIdAndUpdate(id, req.body)
        .then((restaurant) => res.redirect(`/restaurants/${id}`))
        .catch(error => console.error(error))
})

//刪除資料
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})
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