const { Schema } = require('mongoose');
const mongoose = require('mongoose')

const studentSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
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
    },
    subjects: [],
})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;