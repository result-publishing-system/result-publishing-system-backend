require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const connectToMongo = require('./db')

const port = process.env.PORT || 3000

app.use(morgan('dev'))

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

connectToMongo()
