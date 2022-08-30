const User = require('../Model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
      const { email,name,password } = req.body;
      try{

        //Check user 
        let Euser = await User.findOne({ email });
        let username = await User.findOne({ name });
        if (Euser || username) {
            return res.status(400).json('มี email หรือ username นี้แล้ว');
        } 
        user = new User({
            email,
            name,
            password
        });

        // Encryt password
        const cracker = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, cracker);
        await user.save();

      }catch(err){

         // check error
         console.log(err.message);
         res.status(500).send('Server Error');
      }

      //payload return jsonwebtoken
      const payload = {
        user:{
            email:user.email,
            name: user.name,
            role: user.role
        }
    }

        jwt.sign(payload,'SecretToken',{ expiresIn: 3600 },  (err, token) => {
            if (err) {
                 throw err;
            }  
            res.json({ token });

        });

}

exports.login = async (req, res) => {
    const { email,password } = req.body;
    try{
          //Check user 
      let Euser = await User.findOne({ email });
      if (!Euser) {
          return res.status(400).json('ไม่มี Email หรือ Username ในระบบ');
      } 

       // Compare Encryt password
       const Match = await bcrypt.compare(password, Euser.password);
       if (!Match) {
           return res.status(400).json('Password ไม่ถูกต้อง');
       }

       //payload return jsonwebtoken
       const payload = {
        Euser: {
            id: Euser._id,
            email: Euser.email,
            name: Euser.name,
            role: Euser.role
        }
    }
    jwt.sign(payload,'SecretToken', { expiresIn: 3600 }, (err, token) => {

            if (err){
                throw err;
            }
            res.json({ token, payload });
        });

    }catch(err){
       // check error
       console.log(err.message);
       res.status(500).send('Server Error');
    }
       
}