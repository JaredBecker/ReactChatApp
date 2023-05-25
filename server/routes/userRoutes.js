const { register } = require('../controllers/userController');

const router = require('express').Router();

console.log('in userRoutes');

// Register here is referring to the register method setup in the user controller
router.post('/register', register);

module.exports = router;