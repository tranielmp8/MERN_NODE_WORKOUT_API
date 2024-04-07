require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const cors = require('cors')

// express app
const app = express();

// MORE MIDDLEWARE for POST and PATCH or PUT, send we are sending data to the server
app.use(express.json());
app.use(cors())

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})


// routes 
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 4000;

// connect to db
mongoose.connect(port)
.then(() => {
  // listen for request
  app.listen(port, () => {
  console.log('Connected to DB and listening on port ' + port);
})
})
.catch((error) => {
  console.log(error)
})



/* not needed anymore this was just to test the api
// app.get('/', (req, res) => {
//   res.json({
//     mssg: 'Welcome to the app'
//   })
// })
*/