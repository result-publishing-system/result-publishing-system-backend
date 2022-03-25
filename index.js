require('dotenv').config()
const express = require('express')
const app = express()
const connectToMongo = require('./db')

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

connectToMongo()
