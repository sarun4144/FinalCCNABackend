const jwt = require("jsonwebtoken");
const User = require('../Model/User')

async function auth(req, res, next) {
  try {
    const token = req.headers['authtoken']
    if (!token) {
      return res.status(401).send('ไม่ได้รับ Token, ปฏิเสธการยืนยันตัวตน');
    }
    const decoded =  jwt.verify(token, 'SecretToken');
    console.log("Current-Auth", decoded);
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).send("Token ไม่ถูกต้อง");
  }
}
exports.auth = auth;

exports.adminCheck = async (req, res, next) => {
  try {
    const { username } = req.user
    const adminUser = await User.findOne({ username }).exec()
    if (adminUser.role !== 'admin') {
      res.status(403).send(err, 'ปฏิเสธกรยืนยันตัวตน')
    } else {
      next()
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Role Admin ไม่ถูกต้อง ");
  }
}


