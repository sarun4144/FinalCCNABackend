
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
        res.send('Hello list person')
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
   
};
exports.read = async (req, res) => {
    try {
        // Code
        res.send('Hello read person')
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
        res.send('Hello remove person')
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
   
};