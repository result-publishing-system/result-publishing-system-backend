const express = require('express');
const Semester = require('../models/Semester');
const router = express.Router()

router.post('/add', async (req, res) => {
    try {
        const semester = await Semester.findOne({semesterNo: req.body.semesterNo});
        if (semester) {
            return res.status(500).json('Semester already exists')
        }
        const newSem = new Semester({
            semesterNo: req.body.semesterNo
        })
        await newSem.save()
        return res.status(200).json(newSem)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/delete', async (req, res) => {
    try {
        const semester = await Semester.findOne({semesterNo: req.body.semesterNo})
        if (semester === null) {
            return res.status(500).json('No semester exists')
        }
        const deleted = await Semester.findOneAndDelete({semesterNo: req.body.semesterNo});
        return res.status(500).json(deleted)
    } catch(err) {
        res.status(500).json(err)
    }
})

