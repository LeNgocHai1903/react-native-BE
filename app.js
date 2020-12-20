const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const express = require('express');
const usersRoutes = require('./route/User');
const RSRoutes = require('./route/reserve-table')
const HttpError = require('./modal/http-error');

const app = express();
app.use(bodyParser.json());



app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type, Accept, Authorization ');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
    next();
  })

  app.use('/api/users', usersRoutes);
  app.use('/api/bill', RSRoutes);

  app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  



mongoose.
connect("mongodb+srv://reactnative:lehai19031998@cluster0.9s7gi.mongodb.net/mern?retryWrites=true&w=majority",{ useNewUrlParser: true },{ useUnifiedTopology: true })
.then(
  () => {
    app.listen(5009);
    console.log("sad")
  }
).catch(err => console.log(err));