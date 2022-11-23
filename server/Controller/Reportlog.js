const CCNA = require('../Database/Config')
const { ObjectId } = require('mongodb')


exports.Reportadd = async (req, res) => {
    var db = await CCNA.getDb();
    const id  = req.params.id;
    const {Name} = req.body;
    try {
            await db.collection('Report').insertOne({ExamId:ObjectId(id),ExName:Name,date: new Date(),Log:{}})
            res.status(200).send("Complete")
    } catch {
  
      res.status(500).send("Server Error!");
    }
  }
exports.Rerecordlist= async (req, res) => {
    var db = await CCNA.getDb();
    const id  = req.params.id;
    try {
           const Data= await db.collection('Report').findOne({ExamId:ObjectId(id)})
            // await db.collection('Report').updateOne({ExamId:ObjectId(id),ExName:Name,date: new Date()})
        console.log(Data.Log)
    res.status(200).send(Data.Log)
    } catch {
  
      res.status(500).send("Server Error!");
    }
  }
exports.Rerecord = async (req, res) => {
    var db = await CCNA.getDb();
    const id  = req.params.id;
    const {Name,Text,Num,Username,mark} = req.body;
    const str = `Log.${mark}`
    try {

        await db.collection('Report').updateOne({ExamId:ObjectId(id)},{$set:{[str]:{Number:Num,Name:Name,Username:Username,Text:Text}}})

    res.status(200).send("Complete")
    } catch {
  
      res.status(500).send("Server Error!");
    }
  }