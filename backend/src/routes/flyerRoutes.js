const express = require('express');
const router = express.Router();
const flyerController = require('../controllers/flyerController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const validate = require('../middleware/validate');
const { flyerValidators, idValidator, paginationValidator } = require('../middleware/validators');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.get('/', paginationValidator, validate, flyerController.getAllFlyers);

router.get('/:id', idValidator, validate, flyerController.getFlyer);

router.post('/', protect, adminOnly, uploadLimiter, upload.single('image'), flyerValidators.create, validate, flyerController.createFlyer);

router.put('/:id', protect, adminOnly, uploadLimiter, upload.single('image'), flyerValidators.create, validate, flyerController.updateFlyer);

router.delete('/:id', protect, adminOnly, idValidator, validate, flyerController.deleteFlyer);

router.patch('/:id/toggle', protect, adminOnly, idValidator, validate, flyerController.toggleFlyerStatus);

module.exports = router;
