const router = require('express').Router();
const routerSignup = require('./signup')
const routerLogin = require('./login')
const routerProfile = require('./profile')
const adminRoutes = require('./admin')
const eventRoutes = require('./event')

router.use('/signup', routerSignup)
router.use('/login', routerLogin)
router.use('/profile', routerProfile)
router.use('/admin', adminRoutes)
router.use('/events', eventRoutes)

router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})

router.get('/', (req, res) => {
    const userSession = req.session.user
    res.render('home', { userSession, title: 'Home', keyword: '' })
})

module.exports = router