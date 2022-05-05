const express = require('express')
const router = express.Router()
const Student = require('../models/Student')

router.get('/:id', async (req, res) => {
    try {
        const subjects = await Student.findOne({_id: req.params.id}).select('subjects')
        console.log(subjects)
        return res.status(200).json(subjects)
    } catch(err) {
        return res.status(500).json(err)
    }
})

router.post('/update/:id', async (req, res) => {
    try {
        const updatedSubjects = req.body.subjects
        const updatedStudentMarks = await Student.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {subjects: updatedSubjects}}
        )
        res.status(200).json(updatedStudentMarks)
    } catch(err) {
        return res.status(500).json(err)
    }
})

module.exports = router