const { default: mongoose } = require('mongoose')
const { Schema } = require('mongoose');
const db = require('../db')

const subjectSchema = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default: 0
    }
})

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;