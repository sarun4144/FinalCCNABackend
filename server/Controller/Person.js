const User = require("../Model/User");
const bcrypt = require('bcryptjs');
const CCNA = require('../Database/Config')
const { ObjectId } = require('mongodb')
exports.create = async (req, res) => {
  try {
    // Code
    res.status(200).send('Hello create person')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
exports.list = async (req, res) => {
  try {
    // Code
    const user = await User.find({}).select("-password").exec();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
exports.reads = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select('-password').exec();
    console.log("reads", user);
    res.status(200).send(user)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.update = async (req, res) => {
  try {
    // Code
    const { id, password } = req.body.values
    const cracker = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, cracker);
    const user = await User.findOneAndUpdate({ _id: id },
      { password: newpassword })
    res.status(200).send('Success')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }

};
exports.remove = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id }).exec();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.changestatus = async (req, res) => {
  try {
    // Code
    console.log("Changestatus", req.body)
    const user = await User.findOneAndUpdate({ _id: req.body.id },
      { enabled: req.body.enabled })
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.changerole = async (req, res) => {
  try {
    // Code
    console.log("Changerole", req.body)
    const user = await User.findOneAndUpdate({ _id: req.body.id },
      { role: req.body.role })
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.Easylog = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  try {
    // Code
    let exname = await db.collection('users').findOne({ _id:ObjectId(id) })
    res.status(200).send(exname.Log.Easy);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.Hardlog = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  try {
    // Code
    let exname = await db.collection('users').findOne({ _id:ObjectId(id)})
    res.status(200).send(exname.Log.Hard);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.ChangeName = async (req, res) => {
  var db = CCNA.getDb();
  const id = req.params.id;
  const username = req.body.values.username
  try {
    // Code
    await db.collection('users').updateOne({ _id:ObjectId(id)}, { $set:{username:username}})
    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};