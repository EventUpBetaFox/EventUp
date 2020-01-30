const router = require('express').Router();
const routerSignup = require('./signup')
const routerLogin = require('./login')
const routerProfile = require('./profile')

router.get('/', (req, res) => {
    res.render('home')
})
router.use('/signup', routerSignup)
router.use('/login', routerLogin)
router.use('/profile', routerProfile)

module.exports = router