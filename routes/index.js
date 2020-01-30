const router = require('express').Router();
const routerSignup = require('./signup')
const routerLogin = require('./login')
const routerProfile = require('./profile')
const adminRoutes = require('./admin')
const eventRoutes = require('./event')

router.get('/', (req, res) => {
    res.render('home')
})
router.use('/signup', routerSignup)
router.use('/login', routerLogin)
router.use('/profile', routerProfile)
router.use('/admin', adminRoutes)
router.use('/events', eventRoutes)

module.exports = router