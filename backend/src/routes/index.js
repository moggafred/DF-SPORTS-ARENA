const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const bookingRoutes = require('./bookingRoutes');
const matchRoutes = require('./matchRoutes');
const flyerRoutes = require('./flyerRoutes');
const galleryRoutes = require('./galleryRoutes');
const pricingRoutes = require('./pricingRoutes');
const settingsRoutes = require('./settingsRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);
router.use('/matches', matchRoutes);
router.use('/flyers', flyerRoutes);
router.use('/gallery', galleryRoutes);
router.use('/pricing', pricingRoutes);
router.use('/settings', settingsRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Natz Sports Arena API is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
