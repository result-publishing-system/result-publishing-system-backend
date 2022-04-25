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
    semester: {
        type: String,
        required: true,
        default: '1st Semester',
        enum: ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'course'
        }
    ]
})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;