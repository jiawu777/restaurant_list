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
    return Restaurant.findByIdAndRemove(id)
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
})


//search功能get
//app.get('/search', (req, res) => {
//
//    const keyword = req.query.keyword.toLowerCase().trim()
//    const filteredRestaurants = Restaurant.filter(item => item.name.toLowerCase().includes(keyword) || item.category.includes(keyword))
//
//    //搜尋結果無法跳出彈出視窗，問題點在這
//    if (!filteredRestaurants.length) {
//        /*查無結果提示方法1:在頁面顯示提示字元，可帶入搜尋關鍵字*/
//        const noSearchResult = `▼▼▼ 以 ${keyword} 搜尋查無相關餐廳，想來點其他美食嗎 ▼▼▼`
//        /*res.render('index', { alert: noSearchResult, restaurants: Restaurant, keyword: keyword })*/
//
//        /*查無結果提示方法2:透過頁面彈出訊息提示無搜尋結果，無法帶入搜尋關鍵字*/
//        res.send("<script>alert(`查無相關餐廳，點擊「確定」返回首頁`);window.location.href = `http://localhost:3000/`;</script>");
//    } else {
//        res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
//    }
//})

//接收server
app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})