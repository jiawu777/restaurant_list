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

* 設定env變數
請參考.env.example檔案設定FB、Mongoose環境變數，並將檔名改為.env
```
FACEBOOK_ID = SKIP
FACEBOOK_SECRET = SKIP
FACEBOOK_CALLBACK='http://localhost:3000/auth/facebook/callback'
SESSION_SECRET='MySecret'
MONGODB_URI='mongodb+srv://admin:admin@cluster0.txrrx.mongodb.net/restaurant_list?retryWrites=true&w=majority'
PORT=3000
```
* 運行種子數據，執行成功將回傳 restaurantSeeder done!
```
npm run seed
```

* 執行app.js

```
npm run dev
```
* 執行成功將顯示以下字樣，即可點入連結使用網站 http://localhost:3000/
```
Express is running on http://localhost:3000
```

* 點餐廳卡片可獲得詳細說明
### Environment - 開發環境

* Nodejs v16.15.0
* nodemon @2.0.16

## Authors

* **ALPHA Camp** - *Initial work*
* **Wu Jia**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

*ALPHA Camp
