const Exam = require('../Model/Exam')

const jwt = require('jsonwebtoken');
const CCNA = require('../Database/Config')


exports.examadd = async (req, res) => {
    var db = CCNA.getDb();
    const {name,title } = req.body;
    //db pp
    await db.collection('PPTEST').insertOne({
            EXname: name,
            title: title,
            date: Date.now()
    },
        function(err,result){
            console.log("1 document inserted");
            res.send("1 document inserted")
        }    
    )
 
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