//載入body-parse把URL-encoded轉譯成req.body物件
const bodyParser = require('body-parser')

//載入method override
const methodOverride = require('method-override')

//載入Restaurant Model
const restaurantList = require('./restaurant.json').results

//載入express功能
const express = require('express')
const app = express()
const port = 3000

//呼叫樣板引擎express-hbs
const exphbs = require('express-handlebars')

//設定模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定靜態檔案(未更動)
app.use(express.static('public'))

//用app.use規定每筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//顯示首頁
app.get('/', (req, res) => {
    res.render('index', { restaurants: restaurantList })
})

//瀏覽特定資料
app.get('/restaurants/:restaurantId', (req, res) => {
    const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurantId)
    res.render('detail', { restaurant: restaurant })

})

//search功能get
app.get('/search', (req, res) => {

    const keyword = req.query.keyword.toLowerCase().trim()
    const filteredRestaurants = restaurantList.filter(item => item.name.toLowerCase().includes(keyword) || item.category.includes(keyword))

    //搜尋結果無法跳出彈出視窗，問題點在這
    if (!filteredRestaurants.length) {
        /*查無結果提示方法1:在頁面顯示提示字元，可帶入搜尋關鍵字*/
        const noSearchResult = `▼▼▼ 以 ${keyword} 搜尋查無相關餐廳，想來點其他美食嗎 ▼▼▼`
        /*res.render('index', { alert: noSearchResult, restaurants: restaurantList, keyword: keyword })*/

        /*查無結果提示方法2:透過頁面彈出訊息提示無搜尋結果，無法帶入搜尋關鍵字*/
        res.send("<script>alert(`查無相關餐廳，點擊「確定」返回首頁`);window.location.href = `http://localhost:3000/`;</script>");
    } else {
        res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
    }
})

//接收server
app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})