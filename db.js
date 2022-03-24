const mongoose = require('mongoose')

const URI = process.env.URI;

mongoose.connect(URI).then((result) => console.log('connected to database'))

module.exports = mongoose;