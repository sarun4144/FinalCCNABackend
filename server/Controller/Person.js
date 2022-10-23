const User = require("../Model/User");
const bcrypt = require('bcryptjs');
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