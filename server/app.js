require('./config/config.js');
require('./models/dbConfig.js');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
 }));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use('/api', rtsIndex);

app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));