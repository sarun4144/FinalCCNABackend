const CCNA = require('../Database/Config')
const { ObjectId } = require('mongodb')
exports.create = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const { name } = req.body;
    let Cname = await db.collection("category").findOne({ name })
    if (Cname) {
      console.log("CATEGORYNAME", Cname.name)
      return res.status(400).json('มี Category นี้แล้ว');
    }
    await db.collection("category").insertOne({
      name: name,
      date: new Date()
    })
    res.send('Success')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
exports.list = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const category = await db.collection('category').find({}).toArray()
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
exports.read = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const id = req.params.id;
    const name = await db.collection("category").findOne({ _id: ObjectId(id) }).exec();
    res.send(name);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.update = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const id = req.params.id;
    const { name } = req.body;
    await db.collection("category").findOneAndUpdate({ _id: ObjectId(id) },
      { $set: { name: name } })
    res.send('Success')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
exports.remove = async (req, res) => {
  var db = CCNA.getDb();
  try {
    // Code
    const id = req.params.id;
    const user = await db.collection("category").findOneAndDelete({ _id: ObjectId(id) })
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};