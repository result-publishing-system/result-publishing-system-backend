const express = require('express')
const router = express.Router()
const Student = require('../models/Student')
const { body } = require('express-validator')
const fetchAdmin = require('../middleware/fetchAdmin')
const fillSubject = require('../middleware/fillSubjects')

//create student
router.post('/create', [
    body('firstname', 'Enter a valid name').isAlpha().isLength({min: 1}),
    body('email', 'Enter a valid email').isEmail(),
    body('enroll_no').isLength({min: 1}),
    body('phone_no', 'Enter a valid phone no.').isNumeric().isLength({min: 10, max: 10}),
], fetchAdmin, async (req, res) => {
    // const [enroll_no, name, branch, email, phone_no, dob, department] = req.body
    try {
        const student = await Student.find({enroll_no: req.body.enroll_no});
        if (student.length > 0) {
            return res.status(500).json("Student already enrolled")
        }
        const newStudent =  new Student({
            name: {
                firstName: req.body.name.firstName,
                lastName: req.body.name.lastName
            },
            enroll_no: req.body.enroll_no,
            branch: req.body.branch,
            email: req.body.email,
            phone_no: req.body.phone_no,
            dob: Date.now(),
            department: req.body.department
        })
        const savedStudent = await newStudent.save()
        await fillSubject(newStudent.department, newStudent._id)
        console.log(savedStudent)
        res.status(200).json(savedStudent) 
    } catch(e) {
        res.status(500).json(e);
    }
})

router.get('/fetchallstudents', fetchAdmin, async (req, res) => {
    try {
        const students = await Student.find()
        if (!students) {
            return res.status(500).json("No student found")
        }
        return res.status(200).json(students)
    } catch (e) {
        return res.status(500).json(e)
    }
})

router.put('/update/:id', [
    body('email', 'Enter a valid email').isEmail(),
    body('phone_no', 'Enter a valid phone no.').isNumeric().isLength({min: 10, max: 10})
], fetchAdmin, async (req, res) => {
    try {
        const [email, phone_no, firstName, lastName, branch, enroll_no] = req.body
        const student = await Student.updateOne({
            _id: req.params.id
        }, {
            $set: {
                name: {
                    firstName: firstName,
                    lastName: lastName
                },
                enroll_no: enroll_no,
                branch: branch,
                email: email,
                phone_no: phone_no
            }
        })
        if (!student) {
            res.status(404).json("Student not found with given id")
        }
        res.status(200).json(student)
    } catch(e) {
        res.status(500).json(e)
    }
})

router.delete('/delete/:id', fetchAdmin, async (req, res) => {
    try {
        const student = await Student.remove({_id: req.params.id})
        if (!student) {
            return res.status(404).json("Student not found")
        } else {
            return res.status(200).json(student)
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

router.get('/get/:id', fetchAdmin, async(req, res) => {
    try {
        const student = await Student.findOne({_id: req.params.id})
        if (!student) {
            res.status(404).json("Student not found")
        } else {
            res.status(200).json(student)
        }
    } catch(error) {    
        res.status(500).json(error)
    }
})

module.exports = router