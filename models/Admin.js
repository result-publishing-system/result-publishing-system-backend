const { Schema } = require('mongoose');
const db = require('../db')

const adminSchema = new db.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;