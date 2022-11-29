const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
// const {readdirSync} = require('fs');
const Conectdatabase = require('./Database/Db');
const Mymodule = require('./Module/getCurrentTime')
const ConectNativedatabase = require('./Database/Config')
const cookieParser = require('cookie-parser')

const Auth = require('./Routes/Auth')
const Category = require('./Routes/Category')
const Cloud = require('./Routes/CloudDinary')
const Exam = require('./Routes/Exam')
const Person = require('./Routes/Person')
//app
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server is Running on port ${PORT}`));
console.log(Mymodule.getCurrentTime())

app.get('/', (req, res) => {
  res.status(200).json({
      status: 200,
      message: "Server is running"
  })
})
//cookie
app.use(cookieParser())

//DB
Conectdatabase()
ConectNativedatabase.connectToServer(function( err, client ) {
    if (err) console.log(err);
    // start the rest of your app here
  } );

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors())

//route
// readdirSync("./Routes").map((r) => app.use("/api", require('./Routes/' + r)));

// app.use('/Auth',Auth)
// app.use('/Category',Category)
// app.use('/Cloud',Cloud)
// app.use('/Exam',Exam)
// app.use('/Person',Person)