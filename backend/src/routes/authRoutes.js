const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { authValidators } = require('../middleware/validators');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, authValidators.register, validate, authController.register);

router.post('/login', authLimiter, authValidators.login, validate, authController.login);

router.get('/profile', protect, authController.getProfile);

router.put('/profile', protect, authValidators.updateProfile, validate, authController.updateProfile);

router.put('/password', protect, authController.changePassword);

module.exports = router;
