const express = require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// middleware function is used before the routers can be used
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts)

// GET A SINGLE workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a new workout
router.delete('/:id', deleteWorkout)

// PATCH or UPDATE a new workout
router.patch('/:id', updateWorkout)

module.exports = router;