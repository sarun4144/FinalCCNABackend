const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const ExamSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            unique: true
        }, 
        title:{
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
}, { timestamps: true });

module.exports = Exam = mongoose.model('exams', ExamSchema);