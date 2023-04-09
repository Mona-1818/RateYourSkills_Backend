const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const usercontroller = require("./controller/user");

dotenv.config();
const port = process.env.PORT;
const DB = process.env.DATABASE_URL;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(DB,{
  useNewUrlParser : true,
  useUnifiedTopology : true,
}).then(() => console.log('Connected!'));

app.post('/register',usercontroller.signup);
app.post('/login',usercontroller.signin);
app.listen(port, ()=>{
  console.log(`The application started sucessfully on port : ${ port }`)
});