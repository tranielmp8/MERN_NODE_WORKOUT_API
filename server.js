require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')
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


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  // listen for request
  app.listen(process.env.PORT, () => {
  console.log('Connected to DB and listening on port ' + process.env.PORT);
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