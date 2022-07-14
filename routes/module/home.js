//瀏覽所有餐廳(首頁)
app.get('/restaurants', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})





