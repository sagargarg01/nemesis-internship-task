const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')

//parsing middlewares
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieParser())

//cors
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use('/', require('./routes/index'))

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
})

module.exports = app
