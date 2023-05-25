const { register, login } = require('../controllers/userController');

const router = require('express').Router();

// Register here is referring to the register method setup in the user controller
router.post('/register', register);
router.post('/login', login);

module.exports = router;