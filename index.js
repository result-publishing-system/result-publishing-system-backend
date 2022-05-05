require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const connectToMongo = require('./db')
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(morgan('dev'))

app.use(cors({
    origin: process.env.CLIENT,
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/student', require('./routes/student'))
app.use('/api/subject', require('./routes/subject'))
app.use('/api/result', require('./routes/result'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

connectToMongo()
