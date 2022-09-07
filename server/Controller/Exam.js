const Exam = require('../Model/Exam')
const Examchoice = require('../Model/ExamChoice')
const jwt = require('jsonwebtoken');

exports.examadd = async (req, res) => {
    const {name,title } = req.body;

    try{
        //Check user 
        let Name = await Exam.findOne({ name });
        if(Name) {
        return res.status(400).json('มีข้อสอบชุดนี้แล้ว');
        } 
        exam = new Exam({
           name,
           title
        });
        await exam.save();
      }catch(err){
         // check error
         console.log(err.message);
         res.status(500).send('Server Error');
      }

     const payload = {
        exam:{
            name:exam.name,
            title: exam.title
        }
    }
        jwt.sign(payload,'SecretToken',{ expiresIn: 3600 },  (err, token) => {
            if (err) {
                 throw err;
            }  
            res.json({ token,payload });

        });
}
exports.examchoice = async (req, res) => {
    const {image,question,choice } = req.body;

    try{
        examchoice = new Examchoice({
            image,
            question,
            choice
        });
        await examchoice.save();
      }catch(err){
         // check error
         console.log(err.message);
         res.status(500).send('Server Error');
      }

     const payload = {
        examchoice:{
            image:examchoice.name,
            question: examchoice.question,
            choice: examchoice.choice
        }
    }
        jwt.sign(payload,'SecretToken',{ expiresIn: 3600 },  (err, token) => {
            if (err) {
                 throw err;
            }  
            res.json({ token,payload });

        });
}
exports.listexam = async (req, res) => {
    try {
    // Code
      const exam = await Exam.find({}).exec();
      res.send(exam);
      
    }catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
  }
   
};