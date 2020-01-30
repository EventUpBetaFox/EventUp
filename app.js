const express = require('express')
const app = express()
const PORT = 3000
const path = require('path')
const session = require('express-session')
const routes = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})