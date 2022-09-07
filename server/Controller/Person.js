
const User = require("../Model/User");
exports.create = async (req, res) => {
    try {
        // Code
        res.send('Hello create person')
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
   
};
exports.list = async (req, res) => {
    try {
    // Code
      const user = await User.find({}).select("-password").exec();
      res.send(user);
    }catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
  }
   
};
exports.read = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};
exports.update = async (req, res) => {
    try {
        // Code
        res.send('Hello update person')
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
   
};
exports.remove = async (req, res) => {
    try {
    // Code
      const id = req.params.id;
      const user = await User.findOneAndDelete({ _id: id });
       res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
  }
};
exports.changerole = async (req, res) => {
    try {
    // Code
      console.log(req.body)
      //const id = req.params.id;
     // const user = await User.findOneAndDelete({ _id: id });
       //res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
  }
};