const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { pricingValidators, idValidator } = require('../middleware/validators');

router.get('/', pricingController.getAllPricing);

router.get('/:id', idValidator, validate, pricingController.getPricing);

router.post('/', protect, adminOnly, pricingController.createPricing);

router.put('/:id', protect, adminOnly, idValidator, pricingValidators.update, validate, pricingController.updatePricing);

module.exports = router;
