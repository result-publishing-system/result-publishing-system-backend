const { default: mongoose } = require('mongoose')
const db = require('../db')

const courseSchema = new db.Schema({
    departmentName: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    enrollees: [{
        type: mongoose.schema.Types.ObjectId,
        ref: 'User',
        status: {
            default: 'ACTIVE',
            enum: ['ACTIVE', 'INACTIVE']
        },
        grades: {
            type: Number,
            default: 0
        }
    }], 
})