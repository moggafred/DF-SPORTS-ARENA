const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { idValidator, paginationValidator } = require('../middleware/validators');

router.get('/dashboard', protect, adminOnly, adminController.getDashboardStats);

router.get('/activity', protect, adminOnly, adminController.getRecentActivity);

router.get('/users', protect, adminOnly, paginationValidator, validate, adminController.getAllUsers);

router.put('/users/:id', protect, adminOnly, idValidator, validate, adminController.updateUser);

module.exports = router;
