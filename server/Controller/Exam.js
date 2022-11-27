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
    })
    const Name = await db.collection('PPTEST').findOne({name})
    const ADDValue={
      Name:Name.name,
      Id:Name._id
    }
    res.status(200).send(ADDValue)
    console.log("DATA", Name)
  } catch {
    /*console.log(err);*/
    res.status(500).send("Server Error!");
  }
}

exports.listexam = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const exams = await db.collection('PPTEST').aggregate([{$lookup:{
      from: "category",
      localField: "Categoryid",
      foreignField: "_id",
      as: "CAT"
    }}]).toArray()
    res.status(200).send(exams);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

}
exports.listexamSort = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const exams = await db.collection('PPTEST').aggregate([{$lookup:{
      from: "category",
      localField: "Categoryid",
      foreignField: "_id",
      as: "CAT"
    }},{$sort:{Docount:-1}}]).toArray()
    res.status(200).send(exams);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

}
exports.listexamSortDate = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const exams2 = await db.collection('PPTEST').aggregate([{$lookup:{
      from: "category",
      localField: "Categoryid",
      foreignField: "_id",
      as: "CAT"
    }},{$sort:{date:-1}}]).toArray()
    res.status(200).send(exams2);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

}
exports.currentExamChoices = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  try {
    const exams = await db.collection('PPTEST').aggregate([{$match:{ _id: ObjectId(id) }},{$lookup:{
      from: "category",
      localField: "Categoryid",
      foreignField: "_id",
      as: "CAT"
    }}]).toArray()
    console.log("Controller-Current-EXAM", exams)
    console.log("Controller-Current-EXAMID", id)
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
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set: { [str]: { "Question": "What is...","images":[],"Choices": [{"text":"Money","isCorrect":false},{"text":"People","isCorrect":false}, {"text":"Mango","isCorrect":false}, {"text":"Eto","isCorrect":false}, {"text":"LOMO","isCorrect":false}],"Answerdetail":"","CorrectANS":[] } } })
    res.status(200).send("Success!!")
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!"); 
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
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set: { [str]: { "Question": "What is...", "Choices": [{"text":"Money","isCorrect":false},{"text":"People","isCorrect":false}, {"text":"Mango","isCorrect":false}, {"text":"Eto","isCorrect":false}, {"text":"LOMO","isCorrect":false}],"Answerdeteil":"","CorrectANS":[] } } })
    res.status(200).send('SuccessFull!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!"); 
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
  const { Question,images,Answerdetail,Choices,CorrectANS,Num} = req.body;
  const str = `exdata.${Num}`
  const exam ={
    Question:Question,
    images:images,
    Answerdetail:Answerdetail,
    Choices: Choices,
    CorrectANS:CorrectANS
  } 
  try {
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{[str]:exam} })
    res.status(200).send('ChangeSuccessful!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.examHeadChange = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const { QuestionName, title,Categoryid} = req.body;

  try {
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{name:QuestionName,title:title,Categoryid:ObjectId(Categoryid)} })
    res.status(200).send('ChangeSuccessful!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.Imageadd = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const {images,Num} = req.body;
  const str = `exdata.${Num}.images`
  try {
    await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{[str]:images} })
    res.status(200).send('ChangeSuccessful!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.Imageremove = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const {images,Num} = req.body;
  const str = `exdata.${Num}.images`
  try {
   await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{[str]:images} })
    res.status(200).send('Delete Imgae Success!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.CorrectAnswer = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const {Choices,CorrectANS,Num} = req.body;
  const str = `exdata.${Num}.CorrectANS`
  const str2 = `exdata.${Num}.Choices`
  try {
   await db.collection('PPTEST').updateOne({ _id: ObjectId(id) }, { $set:{[str]:CorrectANS,[str2]:Choices}})
    res.status(200).send('Correct Choice Change Complete!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.Easyrecord = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const {Easy,UserID,Type,Num,Date,ExamObjectid,Examname,Title,Category,Score} = req.body
  const str = `Log.${Type}.${Num}`
  try {
    await db.collection('users').updateOne({ _id:ObjectId(UserID)}, { $set:{[str]:{ExamObjectid:ObjectId(ExamObjectid),Examname:Examname,Title:Title,Category:Category,
      Score:Score,Date:Date,Exam:Easy}}})
    res.status(200).send('Record Complete!! Do you want to do again?')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
} 
exports.Hardrecord = async (req, res) => {
  var db = CCNA.getDb();
  const {Hard,UserID,Type,Num,Time,Date,ExamObjectid,Examname,Title,Category,Score} = req.body
  const str = `Log.${Type}.${Num}`
  try {
    // await db.collection('users').updateOne({ _id:ObjectId(UserID)}, { $set:{[str]:{ExamObjectid:ObjectId(ExamObjectid),Examname:Examname,Title:Title,Category:Category,
    //   Score:Score,Time:Time,Date:Date,Exam:Hard}}})
    res.status(200).send('ADD COMPLETE!!')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
exports.CountStamp = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const {Docount} = req.body
  try {
    await db.collection('PPTEST').updateOne({ _id:ObjectId(id)},{$set:{Docount:Docount}})
   console.log(Docount)
    res.status(200).send("Stamp");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}

exports.removeExam = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
 
  try {
    await db.collection('PPTEST').deleteOne({ _id:ObjectId(id)})
  
    res.status(200).send("Delete Complete");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
