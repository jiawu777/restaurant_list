![image](https://github.com/jiawu777/restaurant_list/blob/main/A7.png)

# Title 我的餐廳清單

1.這是一個展示餐廳清單的網站與簡單資料
2.點入可見餐廳詳細介紹
3.可以透過搜尋名稱找到目標餐廳

### Installing 下載專案至本機

* 打開 terminal, Clone 此專案至本機
```
git clone https://github.com/jiawu777/restaurant_list.git
```
* 下載npm、express、express-handlebars 執行
```
npm init -y
npm i express express-handlebars
```

* 登入mongodb資料庫
process.env.MONGODB_URI 環境變數的設定
```
set MONGODB_URI = <連線 mongoDB的URI> //密碼、資料庫名稱請自行修改
```
* 運行種子數據
```
node models/seeds/restaurantSeeder.js
```

* 執行app.js

```
nodemon app.js
```
* 執行成功將顯示以下字樣，即可點入連結使用網站 http://localhost:3000/
```
Express is running on http://localhost:3000
```

* 點餐廳卡片可獲得詳細說明
### Environment - 開發環境

* Nodejs v16.15.0
* nodemon @2.0.16

## package - 使用套件

* express v4.16.4
* express - handlebars v3.0.0
* bootstrap v4.6.x

## Authors

* **ALPHA Camp** - *Initial work*
* **Wu Jia**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

*ALPHA Camp
