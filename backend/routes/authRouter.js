const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middlewares/validation');

const router = require('express').Router()

router.post('/login', loginValidation, login)
router.post('/signup', signupValidation, signup)

module.exports = router