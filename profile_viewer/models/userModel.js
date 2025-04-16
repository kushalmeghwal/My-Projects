import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollNo: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    marks: {
        type: [Number],
        required: true,
    },
    totalMarks: {
        type: Number,
        default: 0,
    },
    cgpa: {
        type: Number,
        default: 0,
    },
    percentage: {
        type: Number,
        default: 0,
    },
    photo: {
        type: String,
        default: '/uploads/admin.png',
    },
});

export const User = mongoose.model('users', userSchema);
