const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');
const Booking = require('../models/Booking');
const Match = require('../models/Match');
const Flyer = require('../models/Flyer');
const Gallery = require('../models/Gallery');
const Pricing = require('../models/Pricing');

exports.getDashboardStats = catchAsync(async (req, res, next) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

        const [
            totalUsers,
            totalBookings,
            totalMatches,
            totalFlyers,
            totalGallery,
            pendingBookings,
            confirmedBookings,
            todayBookings,
            weekBookings,
            lastMonthBookings,
            upcomingMatches
        ] = await Promise.all([
            User.countDocuments({ isActive: true }),
            Booking.countDocuments(),
            Match.countDocuments(),
            Flyer.countDocuments({ isActive: true }),
            Gallery.countDocuments({ isActive: true }),
            Booking.countDocuments({ status: 'pending' }),
            Booking.countDocuments({ status: 'confirmed' }),
            Booking.countDocuments({
                preferredDate: { $gte: today, $lt: tomorrow },
                status: { $in: ['pending', 'confirmed'] }
            }),
            Booking.countDocuments({
                preferredDate: { $gte: weekStart },
                status: { $in: ['pending', 'confirmed'] }
            }),
            Booking.countDocuments({
                preferredDate: { $gte: lastMonthStart, $lte: lastMonthEnd }
            }),
            Match.countDocuments({
                status: 'upcoming',
                date: { $gte: today }
            })
        ]);

        const revenue = await Booking.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const monthlyRevenue = await Booking.aggregate([
            { $match: { status: 'confirmed', preferredDate: { $gte: monthStart } } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('confirmedBy', 'name');

        const bookingStats = await Booking.aggregate([
            { $match: { createdAt: { $gte: weekStart } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const bookingTypeStats = await Booking.aggregate([
            { $match: { status: { $in: ['pending', 'confirmed'] } } },
            { $group: { _id: '$bookingType', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                overview: {
                    totalUsers,
                    totalBookings,
                    totalMatches,
                    totalFlyers,
                    totalGallery,
                    pendingBookings,
                    confirmedBookings,
                    todayBookings,
                    weekBookings,
                    lastMonthBookings,
                    upcomingMatches
                },
                revenue: {
                    total: revenue[0]?.total || 0,
                    monthly: monthlyRevenue[0]?.total || 0
                },
                recentBookings,
                bookingStats,
                bookingTypeStats
            }
        });
});

exports.getRecentActivity = catchAsync(async (req, res, next) => {
        const limit = parseInt(req.query.limit) || 10;

        const [recentBookings, recentMatches] = await Promise.all([
            Booking.find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .select('customerName bookingType status createdAt'),
            Match.find()
                .sort({ createdAt: -1 })
                .limit(limit)
                .select('teamA teamB tournament status date createdAt')
        ]);

        res.json({
            success: true,
            data: {
                recentBookings,
                recentMatches
            }
        });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            User.countDocuments()
        ]);

        res.json({
            success: true,
            data: {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
});

exports.updateUser = catchAsync(async (req, res, next) => {
        const { isActive, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive, role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            data: { user }
        });
});
