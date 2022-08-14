import mongoose from "mongoose";


const Schema = mongoose.Schema;




export const UserSchema = new Schema({
    // @ts-ignore
    email: {
        type: String,
        required: 'Email is required',
        unique: true
    },
    password: {
        type: String,
        required: 'Enter a password',
    },
    firstName: {
        type: String,
        allowNull: false,
        default: ''
    },

    lastName: {
        type: String,
        allowNull: false,
        default: ''
    },
    company: {
        type: String,
        allowNull: false,
        default: ''
    },
    phone: {
        type: Number,
        allowNull: false,
        default: 0
    },
    created_date: {
        type: Date,
        allowNull: false,
        default: Date.now
    },
    last_login_timestamp: {
        type: Date,
        allowNull: false,
        default: Date.now
    },
    confirmed_email: {
        type: Boolean,
        default: false,
        allowNull: false
    },
    is_active: {
        type: Boolean,
        allowNull: false,
        default: true
    }
})
