const User = require('../Model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    //Check user 
    let Euser = await User.findOne({ email });
    let name = await User.findOne({ username });
    if (Euser || name) {
      return res.status(400).json('มี email หรือ username นี้แล้ว');
    }
    user = new User({
      email,
      username,
      password
    });
    // Encryt password
    const cracker = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, cracker);
    await user.save();

  } catch (err) {

    // check error
    console.log(err.message);
    res.status(500).send('Server Error');
  }

  //payload return jsonwebtoken
  const payload = {
    user: {
      email: user.email,
      username: user.username,
      role: user.role
    }
  }

  jwt.sign(payload, 'SecretToken', { expiresIn: 3600 }, (err, token) => {
    if (err) {
      throw err;
    }
    res.json({ token, payload });

  });

}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    var user = await User.findOneAndUpdate({ email }, { new: true });
    console
    if (user && user.enabled) {

      // Check Password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password ไม่ถูกต้อง");
      }
      // Payload
      const payload = {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      }
      // Generate Token
      jwt.sign(payload, 'SecretToken', { expiresIn: 3600 }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token, payload });
      });

    } else {
      return res.status(400).send("ไม่มี Email หรือ Username ในระบบ'");
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}
//admin and user use togather
exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select('-password').exec();
    console.log("Controller-Current", user);
    res.send(user)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
}


