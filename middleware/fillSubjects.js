const Student = require("../models/Student")
const subjects = require('../constants')

module.exports = async (department, id) => {
    console.log(subjects.get(department))
    const updatedStudent = await Student.findByIdAndUpdate(
        {_id: id},
        {$push: {subjects: subjects.get(department)}}    
    )
    console.log(updatedStudent)
}