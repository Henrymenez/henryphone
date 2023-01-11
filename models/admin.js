const mongoose = require("mongoose")
const validator = require('validator')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    avatar: {
        type: Buffer
    },
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not include "password"')
            }
        }
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model("admin", adminSchema)