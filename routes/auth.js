const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchAdmin')

const {body, validationResult} = require('express-validator')

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/createadmin', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let admin = await Admin.findOne({email: req.body.email});
        if (admin) {
            return res.status(400).json({error: "Sorry a user with this email is already registered"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        admin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken})
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        let admin = await Admin.findOne({email});
        if (!admin) {
            return res.status(400).json({error: "Sorry a user with this email does not exist"})
        }
        const passwordCompare = await bcrypt.compare(password, admin.password)
        if (!passwordCompare) {
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        const data = {
            admin: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken: authToken, success: true})
    } catch(error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

router.post('/getadmin',fetchuser, async (req, res) => {
    try {
        adminId = req.admin.id;
        const admin = await Admin.findById(adminId).select('-password');
        res.send(admin);
    } catch(error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router