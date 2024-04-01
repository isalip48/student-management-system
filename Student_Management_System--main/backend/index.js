const express = require('express');
const app = express();
const mongoose = require('mongoose');
const admin = require('./routes/admin');
const student = require('./routes/student');
const course = require('./routes/course');
const imageUpload = require('./routes/imageUpload');
const studentAuth = require('./routes/studentAuth');

mongoose
  .connect(
    'mongodb+srv://isali16:isali1234@cluster0.kzgyqsk.mongodb.net/StudentManagementDB?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB..'));

app.use(express.json());

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(allowCrossDomain);
app.use('/api/admin', admin);
app.use('/api/student', student);
app.use('/api/upload', imageUpload);
app.use('/api/studentAuth', studentAuth);
app.use('/api/course', course);

const PORT = parseInt(process.env.PORT);
const port = process.env.PORT || 5030;
app.listen(port, () => console.log('Listening on port `$port'));
console.log(port);
