const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//呼叫json資料庫
const restaurantList = require('../../restaurant.json').results

//載入Restaurant Model
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
    {
        name: 'user1',
        email: 'user1@example.com',
        password: '12345678',
        indexField: [0, 1, 2]
    },
    {
        name: 'user2',
        email: 'user2@example.com',
        password: '12345678',
        indexField: [3, 4, 5]
    }
]

//連線成功
db.once('open', () => {
    Promise
        .all(SEED_USER.map(user => {
            const { name, email, password, indexField } = user
            return User.create({
                name,
                email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
                /*bcrypt.hash takes a callback as its third parameter which will be called when the hash is completed. bcrypt.hashSync runs the hash, waits for it to complete and returns the hashed value.*/
            })
                .then((user) => {
                    const userId = user._id
                    const restaurants = indexField.map(index => {
                        const restaurant = ({ ...restaurantList[index], userId })
                        return restaurant
                    })
                    return Restaurant.create(restaurants)
                })
                .catch(err => console.log(err))
        })
        )
        .then(() => {
            console.log('restaurantSeeder done!')
            process.exit()
        })
        .catch(error => console.error(error))
        .finally(() => db.close)
})