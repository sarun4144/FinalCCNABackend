const CCNA = require('../Database/Config')
const { ObjectId } = require('mongodb')

exports.examadd = async (req, res) => {
  var db = await CCNA.getDb();
  try {
    const { name, title,Categoryid } = req.body;
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
      Categoryid:ObjectId(Categoryid),
      date: new Date()
    },
      function (err, result) {
        console.log("1 document inserted");
        res.status(200).send("1 document inserted")
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
    res.status(200).send(exams);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

}
exports.currentExamChoices = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  try {
    const exams = await db.collection('PPTEST').findOne({ _id: ObjectId(id) })
    console.log("Controller-Current-EXAM", exams)
    res.status(200).send(exams)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.examChoicesAdd = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const { Num } = req.body
  const str = `exdata.${Num}`
  try {
    console.log(str)
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set: { [str]: { "Question": "What is...", "Choices": ["Money", "People", "Mango", "Eto", "LOMO"] } } })
    res.status(200).send('SuccessFull!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!"); cv
  }
}
exports.examChoicesDelete = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const Num = req.body.Num
  const str = `exdata.${Num}`
  try {
   await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $unset: { [str]: {} } })
   const exams = await db.collection('PPTEST').findOne({ _id: ObjectId(id) })
   res.status(200).send(exams)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.examChoicesAddChoice = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const { Num } = req.body
  const str = `exdata.${Num}`
  try {
    console.log(str)
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set: { [str]: { "Question": "What is...", "Choices": ["Money", "People", "Mango", "Eto", "LOMO"] } } })
    res.status(200).send('SuccessFull!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!"); cv
  }
}
exports.examChoicesDeleteChoice = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const Num = req.body.Num
  const str = `exdata.${Num}`
  try {
   await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $unset: { [str]: {} } })
   const exams = await db.collection('PPTEST').findOne({ _id: ObjectId(id) })
   res.status(200).send(exams)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.examReset = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const payload = req.body;
  try {
   await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{"exdata":payload } })
   res.status(200).send('Successful!!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.examChoicesChange = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const { Question, Choices,Num} = req.body;
  const str = `exdata.${Num}`
  const exam ={
    Question:Question,
    Choices: Choices
  } 
  try {
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{[str]:exam} })
    res.status(200).send('ChangeSuccessful!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}

