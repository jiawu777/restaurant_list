const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage: true
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位皆為必填!' })
    }
    if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼輸入不一致!' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmPassword
        })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                errors.push({ message: '此Email已被註冊' })
                return res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    confirmPassword
                })
            } else {
                return User
                    .create({
                        name,
                        email,
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
                    })
                    .then(() => res.redirect('/users/login'))
                    .catch(err => console.log(err))

            }
        })
        .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', "你已經成功登出!")
    res.redirect('/users/login')
})
module.exports = router