const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { bookingValidators, idValidator, paginationValidator } = require('../middleware/validators');
const { bookingLimiter } = require('../middleware/rateLimiter');

router.get('/public', bookingController.getPublicBookingInfo);

router.get('/availability', bookingController.checkAvailability);

router.get('/stats', protect, adminOnly, bookingController.getStats);

router.get('/', protect, adminOnly, paginationValidator, validate, bookingController.getAllBookings);

router.get('/:id', protect, adminOnly, idValidator, validate, bookingController.getBooking);

router.post('/', bookingLimiter, bookingValidators.create, validate, bookingController.createBooking);

router.put('/:id', protect, adminOnly, idValidator, bookingValidators.update, validate, bookingController.updateBooking);

router.delete('/:id', protect, adminOnly, idValidator, validate, bookingController.deleteBooking);

router.post('/:id/cancel', protect, adminOnly, idValidator, validate, bookingController.cancelBooking);

module.exports = router;
