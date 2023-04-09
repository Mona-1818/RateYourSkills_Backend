const express = require('express');
// const data = require('./data/data');
const dotenv = require('dotenv');
const cors = require('cors');
const connection = require('./config/db')
const user = require('./routes/user');
const { notfound, errorhandler } = require('./middlewares/error');

dotenv.config();
connection();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.Port;

app.use('/', user);
app.use(notfound);
app.use(errorhandler);

app.listen(port, console.log(`server started on port ${port}.`));
