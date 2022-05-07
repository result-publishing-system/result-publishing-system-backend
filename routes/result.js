const express = require('express')
const Student = require('../models/Student')
const router = express.Router()
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')
const { json } = require('express/lib/response')
const homedir = require('os').homedir


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

router.get('/pdf/:id/:sem', async (req, res) => {
    try {
        const data = await Student.findById(req.params.id)
        const filePathName = path.resolve(__dirname, 'template.ejs')
        console.log(filePathName)
        const htmlString = fs.readFileSync(filePathName).toString()
        // console.log(htmlString)
        let options = {format: 'Letter'}
        const ejsData = ejs.render(htmlString, {data: data, sem: req.params.sem})
        // console.log(ejsData)
        await pdf.create(ejsData, options).toFile('generatedfile.pdf',(err, response) => {
            if (err) return console.log(err);
            return response;
        });
        // const file = '/usr/src/app/genetatedfile.pdf'
        // console.log(homedir)
        res.status(200).json("ok")
        const file = "C:\\Users\\kunal\\Development\\Result Publishing System Backend\\generatedfile.pdf"
        console.log(file)
        res.download(file)
    } catch(err) {
        return res.status(500).json(err)
    }
})

module.exports = router