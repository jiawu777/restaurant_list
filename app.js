//呼叫mongoose
const mongoose = require('mongoose')

//載入body-parse把URL-encoded轉譯成req.body物件
const bodyParser = require('body-parser')

//載入method override
const methodOverride = require('method-override')

//載入Restaurant Model
const Restaurant = require('./models/restaurant')
const routes = require('./routes')//預設直接找index可省略
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

//設定模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//設定靜態檔案(未更動)
app.use(express.static('public'))

//用app.use規定每筆請求都需要透過body-parser進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//用methodOverride把程式碼Restful化
app.use(methodOverride('_method'))

//使用路由器
app.use(routes)





//接收server
app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})