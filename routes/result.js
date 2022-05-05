const express = require('express')
const Student = require('../models/Student')
const router = express.Router()

router.get('/:id/:sem', async (req, res) => {
    try {
        let student = await Student.findOne({_id: req.params.id}).select('subjects')
        let totalMarks = 0, cnt = 1;
        let relevantSubjects = []
        student.subjects.forEach(doc => {
            console.log(doc.semester, req.params.sem)
            if (doc.semester == req.params.sem) {
                relevantSubjects.push(doc)
                totalMarks += doc.marks
                cnt++;
            }
        });
        let result = (totalMarks / (cnt * 100)) * 100
        console.log(student)
        return res.status(200).json({relevantSubjects, result})
    } catch(err) {
        return res.status(500).json(err)
    }
})

module.exports = router