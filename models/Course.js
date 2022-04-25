const { default: mongoose } = require('mongoose')
const db = require('../db')

const courseSchema = new db.Schema({
    courseName: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true,
        default: '1st Semester',
        enum: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']
    },
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;