const router = require('express').Router()
const adminRoutes = require('./admin')
const eventRoutes = require('./event')

router.use('/admin', adminRoutes)
router.use('/events', eventRoutes)
module.exports = router