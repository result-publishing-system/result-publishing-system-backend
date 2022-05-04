const express = require('express')
const Subject = require('../models/Subject')
const router = express.Router()
const { body } = require('express-validator')

// router.post('/add',[
//     body('subjectName', 'Enter a valid subject name').isLength({min: 1})
// ], async (req, res) => {
//     const subjectName = req.body.subjectName;
//     try {
//         let subject = await Subject.findOne({subjectName: subjectName});
//         if (subject !== null) {
//             return res.status(500).json('Subject already exists');
//         }
//         console.log(subjectName)
//         const newSubject = new Subject({
//             subjectName: subjectName
//         });
//         await newSubject.save();
//         return res.status(200).json(newSubject);
//     } catch(err) {
//         return res.status(500).json(err)
//     }
// })

// router.post('/addmarks/:id', [
//     body('marks', 'Enter valid marks').isNumeric({min: 0, max: 100})
// ], async (req, res) => {
//     let marks = req.body.marks
//     try {
//         let subject = await Subject.findOne({_id: req.params.id})
//         if (!subject) {
//             res.status(500).json("No subject exists")
//         }
//         let updatedSubject = await Subject.updateOne({_id: req.params.id},{
//             "$set": {marks: marks}
//         })
//         return res.status(200).json(updatedSubject)
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })

// router.get('/show/:id', async (req,res) => {
//     try {  
//         const subject = await Subject.findOne({_id: req.params.id})
//         if (!subject) {
//             return res.status(500).json("Subject not found")
//         }
//         return res.status(200).json(subject)
//     } catch(err) {
//         return res.status(500).json(err)
//     }
// })

// router.delete('/delete/:id', async (req, res) => {
//     try {
//         let deletedSubject = await Subject.findByIdAndDelete({_id: req.params.id})
//         if (!deletedSubject) {
//             res.status(500).json("No subject exists")
//         }
//         await deletedSubject.remove()
//         res.status(200).json(deletedSubject)
//     } catch(err) {
//         res.status(500).json(err)
//     }
// }) 

router.post('/add',[
    body('subjectName', 'Enter a valid subject name').isLength({min: 1}),
    body('semesterNo', 'Enter a valid semester No,').isNumeric({min: 1, max: 8}),
], async (req, res) => {
    const subjectName = req.body.subjectName;
    try {
        let subject = await Subject.findOne({subjectName: subjectName});
        if (subject !== null) {
            return res.status(500).json('Subject already exists');
        }
        console.log(subjectName)
        const newSubject = new Subject({
            subjectName: subjectName
        });
        await newSubject.save();
        return res.status(200).json(newSubject);
    } catch(err) {
        return res.status(500).json(err)
    }
})

module.exports = router