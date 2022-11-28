const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs');
const Conectdatabase = require('./Database/Db');
const Mymodule = require('./Module/getCurrentTime')
const ConectNativedatabase = require('./Database/Config')
const cookieParser = require('cookie-parser')

//app
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server is Running on port ${PORT}`));
console.log(Mymodule.getCurrentTime())


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
// readdirSync('./Routes').map((r) => app.use("/api", require('./Routes/' + r)));
app.use('/api',require('./Routes/Auth'))
app.use('/api',require('./Routes/Category'))
app.use('/api',require('./Routes/CloudDinary'))
app.use('/api',require('./Routes/Exam'))
app.use('/api',require('./Routes/Person'))