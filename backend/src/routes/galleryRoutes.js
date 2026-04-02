const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { protect, adminOnly } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const validate = require('../middleware/validate');
const { galleryValidators, idValidator, paginationValidator } = require('../middleware/validators');
const { uploadLimiter } = require('../middleware/rateLimiter');

router.get('/categories', galleryController.getCategories);

router.get('/', paginationValidator, validate, galleryController.getAllImages);

router.get('/:id', idValidator, validate, galleryController.getImage);

router.post('/', protect, adminOnly, uploadLimiter, upload.single('image'), galleryValidators.create, validate, galleryController.uploadImage);

router.put('/:id', protect, adminOnly, uploadLimiter, upload.single('image'), galleryValidators.create, validate, galleryController.updateImage);

router.delete('/:id', protect, adminOnly, idValidator, validate, galleryController.deleteImage);

module.exports = router;
