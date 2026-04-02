const Booking = require('../models/Booking');
const { sendBookingConfirmation, sendBookingStatusUpdate } = require('../services/emailService');
const { sendBookingNotification, sendBookingConfirmation: sendWAConfirmation } = require('../services/whatsappService');

exports.getAllBookings = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        
        if (req.query.status) {
            filter.status = req.query.status;
        }
        
        if (req.query.bookingType) {
            filter.bookingType = req.query.bookingType;
        }
        
        if (req.query.startDate && req.query.endDate) {
            filter.preferredDate = {
                $gte: new Date(req.query.startDate),
                $lte: new Date(req.query.endDate)
            };
        }

        const [bookings, total] = await Promise.all([
            Booking.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('confirmedBy', 'name email'),
            Booking.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: {
                bookings,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

exports.createBooking = async (req, res, next) => {
    try {
        const bookingData = {
            ...req.body,
            status: 'pending'
        };

        const booking = await Booking.create(bookingData);

        if (process.env.NODE_ENV === 'production' || process.env.TWILIO_ACCOUNT_SID) {
            await sendBookingNotification(booking);
        }

        if (booking.customerEmail) {
            await sendBookingConfirmation(booking);
        }

        res.status(201).json({
            success: true,
            message: 'Booking submitted successfully. We will contact you shortly.',
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateBooking = async (req, res, next) => {
    try {
        const { status, totalPrice, adminNotes, cancellationReason } = req.body;

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        const previousStatus = booking.status;

        if (status) booking.status = status;
        if (totalPrice !== undefined) booking.totalPrice = totalPrice;
        if (adminNotes !== undefined) booking.adminNotes = adminNotes;
        if (cancellationReason !== undefined) booking.cancellationReason = cancellationReason;

        if (status === 'confirmed' && previousStatus !== 'confirmed') {
            booking.confirmedBy = req.user._id;
            booking.confirmedAt = new Date();
        }

        await booking.save();

        if (previousStatus !== status) {
            if (booking.customerEmail) {
                await sendBookingStatusUpdate(booking);
            }
            
            if (process.env.TWILIO_ACCOUNT_SID) {
                await sendWAConfirmation(booking);
            }
        }

        res.json({
            success: true,
            message: 'Booking updated successfully',
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

exports.cancelBooking = async (req, res, next) => {
    try {
        const { cancellationReason } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                status: 'cancelled',
                cancellationReason: cancellationReason || 'Cancelled by admin'
            },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            data: { booking }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.getPublicBookingInfo = async (req, res, next) => {
    try {
        const Pricing = require('../models/Pricing');
        const Settings = require('../models/Settings');

        const [pricing, settings] = await Promise.all([
            Pricing.find({ isActive: true }).sort({ type: 1 }),
            Settings.findOne()
        ]);

        res.json({
            success: true,
            data: {
                pricing,
                settings: settings ? {
                    operatingHours: settings.operatingHours,
                    advanceBookingDays: settings.bookingSettings?.advanceBookingDays || 30,
                    whatsapp: settings.whatsapp,
                    phone: settings.phone
                } : null
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.checkAvailability = async (req, res, next) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date is required'
            });
        }

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const bookings = await Booking.find({
            preferredDate: { $gte: startOfDay, $lte: endOfDay },
            status: { $in: ['pending', 'confirmed'] }
        }).select('preferredTime duration');

        const bookedSlots = bookings.map(b => ({
            startTime: b.preferredTime,
            duration: b.duration
        }));

        res.json({
            success: true,
            data: {
                date,
                bookedSlots,
                isAvailable: bookedSlots.length === 0
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getStats = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        const [
            totalBookings,
            pendingBookings,
            todayBookings,
            weekBookings,
            monthBookings,
            confirmedBookings
        ] = await Promise.all([
            Booking.countDocuments(),
            Booking.countDocuments({ status: 'pending' }),
            Booking.countDocuments({ 
                preferredDate: { $gte: today, $lt: tomorrow },
                status: { $in: ['pending', 'confirmed'] }
            }),
            Booking.countDocuments({ 
                preferredDate: { $gte: weekStart },
                status: { $in: ['pending', 'confirmed'] }
            }),
            Booking.countDocuments({ 
                preferredDate: { $gte: monthStart },
                status: { $in: ['pending', 'confirmed'] }
            }),
            Booking.countDocuments({ status: 'confirmed' })
        ]);

        const revenueResult = await Booking.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        res.json({
            success: true,
            data: {
                totalBookings,
                pendingBookings,
                todayBookings,
                weekBookings,
                monthBookings,
                confirmedBookings,
                totalRevenue: revenueResult[0]?.total || 0
            }
        });
    } catch (error) {
        next(error);
    }
};
