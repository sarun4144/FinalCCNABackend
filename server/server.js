const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs');
const Conectdatabase = require('./Database/Db');
const Mymodule = require('./Module/getCurrentTime')
const ConectNativedatabase = require('./Database/Config')
//app
const app = express();
const PORT = process.env.Port || 5000;
app.listen(PORT,() => console.log(`Server is Running on port ${PORT}`));
console.log(Mymodule.getCurrentTime())

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
readdirSync('./Routes')
.map((r) => app.use("/api", require('./Routes/' + r)));