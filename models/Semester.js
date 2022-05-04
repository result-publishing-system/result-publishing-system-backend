const { default: mongoose } = require('mongoose')
const db = require('../db')

const semesterSchema = new db.Schema({
    SemesterNo: {
        type: Number,
        required: true
    },
    subjects: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'subject'
        }
    ]
})

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;