const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const ExamChoiceSchema = new mongoose.Schema({
        images: {
            type: Array,
            default:null
        },
        question:{
            type: String,
            required: true,
            unique: true
        }, 
        examof :{
            type: ObjectId,
            ref: "exams",
        },
        choice:{
            A:{
                type: String,
                default: "No Choice"
            },
            B:{
                type: String,
                default: "No Choice"
            },
            C:{
                type: String,
                default: "No Choice"
            },
            D:{
                type: String,
                default: "No Choice"
            },
            E:{
                type: String,
                default: "No Choice"
            },
        },
        date: {
            type: Date,
            default: Date.now
        }

}, { timestamps: true });

module.exports = Examchoice = mongoose.model('examchoice', ExamChoiceSchema);