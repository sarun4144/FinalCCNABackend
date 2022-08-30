const jwt = require('jsonwebtoken');

function auth (req, res, next){
    const token = req.headers['authtoken'];

    // console.log('Middleware', token);
    if (!token) {
        return res.status(401)
            .json({ msg: 'ไม่ได้รับ Token, ปฏิเสธการยืนยันตัวตน' });
    }

    // verify token
    try {
        const decoded = jwt.verify(token, 'SecretToken');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401)
            .json({ msg: 'Token ไม่ถูกต้อง' });
    }
}
 
exports.auth = auth;