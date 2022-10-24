const cloudinary = require("cloudinary");
const CCNA = require('../Database/Config')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.createImage = async (req, res) => {
    var db = CCNA.getDb();
    try {
        // Code
        const result = await cloudinary.uploader.upload(
            req.body.image,{
            public_id: Date.now(),
            resource_type: "auto", 
        })
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Upload Error!");
    }

};
exports.removeImage = async (req, res) => {
    var db = CCNA.getDb();
    try {
        // Code
        const image_id = req.body.public_id;
        await cloudinary.uploader.destroy(image_id,(result) => {
            res.status(200).send(result);
        })
       
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
    }
};