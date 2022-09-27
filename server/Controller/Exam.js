const jwt = require('jsonwebtoken');
const CCNA = require('../Database/Config')
const { ObjectId } = require('mongodb')

exports.examadd = async (req, res) => {
  var db = CCNA.getDb();
  try {
    const { name, title } = req.body;
    //db pp
    let exname = await db.collection('PPTEST').findOne({ name })
    if (exname) {
      return res.status(400).json('มีชื่อ Exam นี้แล้ว');
    }
    await db.collection('PPTEST').insertOne({
      name: name,
      title: title,
      exdata: {

      },
      date: new Date()
    },
      function (err, result) {
        console.log("1 document inserted");
        res.send("1 document inserted")
      }
    )
    const Array = await db.collection('PPTEST').find().toArray()
    console.log("DATA", Array)
  } catch {
    console.log(err);
    res.status(500).send("Server Error!");
  }

}

exports.listexam = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const exams = await db.collection('PPTEST').find({}).toArray()
    res.send(exams);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

}
exports.currentExam = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  try {
    const exams = await db.collection('PPTEST').findOne({_id :ObjectId(id)})
    console.log("Controller-Current-EXAM", exam);
    res.send(exams)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}