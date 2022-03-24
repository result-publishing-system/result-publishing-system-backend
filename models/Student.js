const { Schema } = require('mongoose');
const db = require('../db')

const studentSchema = new db.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    enroll_no: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;