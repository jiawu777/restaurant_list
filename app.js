//載入express功能
const express = require('express')
const exphbs = require('express-handlebars')//呼叫樣板引擎express-hbs
const bodyParser = require('body-parser')//載入body-parse把URL-encoded轉譯成req.body物件
const methodOverride = require('method-override')//載入method override
const session = require('express-session')
const flash = require('connect-flash')


const usePassport = require('./config/passport')

const routes = require('./routes')//預設直接找index可省略
const { use } = require('passport')
require('./config/mongoose')//載入mongoose


const app = express()

app.use(express.static('public'))//設定靜態檔案(未更動)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))//設定模板引擎
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))//用app.use規定每筆請求都需要透過body-parser進行前置處理
app.use(methodOverride('_method'))//用methodOverride把程式碼Restful化
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})
app.use(routes)//使用路由器
app.listen(3000, () => {
    console.log(`Express is running on http://localhost:3000`)
})//接收server