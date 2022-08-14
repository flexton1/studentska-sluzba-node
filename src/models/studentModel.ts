import mongoose from "mongoose";


const Schema = mongoose.Schema;


export const StudentSchema = new Schema({
    email: {
        type: String,
        allowNull: true
    },
    firstName: {
        type: String,
        required: 'First name is required'
    },

    lastName: {
        type: String,
        required: 'Last name is required'
    },
    // @ts-ignore
    indexNumber: {
        type: String,
        required: 'Index number is required',
        unique: true
    },
    year: {
        type: Number,
        allowNull: false
    },
    userId: {
        type: String,
        allowNull: false
    },
    studentStatus: {
        type: Number,
        allowNull: true
    },
    phone: {
        type: Number,
        allowNull: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean,
        default: true,
        allowNull: false
    }
})
