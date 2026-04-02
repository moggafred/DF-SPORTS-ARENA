const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/public', settingsController.getPublicSettings);

router.get('/', protect, adminOnly, settingsController.getSettings);

router.put('/', protect, adminOnly, settingsController.updateSettings);

module.exports = router;
