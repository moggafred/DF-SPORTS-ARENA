const Match = require('../models/Match');

exports.getAllMatches = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }

        if (req.query.upcoming === 'true') {
            filter.status = 'upcoming';
            filter.date = { $gte: new Date() };
        }

        if (req.query.tournament) {
            filter.tournament = { $regex: req.query.tournament, $options: 'i' };
        }

        const [matches, total] = await Promise.all([
            Match.find(filter)
                .sort({ date: 1 })
                .skip(skip)
                .limit(limit),
            Match.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: {
                matches,
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

exports.getMatch = async (req, res, next) => {
    try {
        const match = await Match.findById(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.json({
            success: true,
            data: { match }
        });
    } catch (error) {
        next(error);
    }
};

exports.createMatch = async (req, res, next) => {
    try {
        const matchData = req.body;
        matchData.createdBy = req.user._id;

        const match = await Match.create(matchData);

        res.status(201).json({
            success: true,
            message: 'Match created successfully',
            data: { match }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateMatch = async (req, res, next) => {
    try {
        const match = await Match.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        if (req.body.scoreA !== undefined && req.body.scoreB !== undefined) {
            if (req.body.scoreA > req.body.scoreB) {
                match.result = 'teamA_win';
            } else if (req.body.scoreB > req.body.scoreA) {
                match.result = 'teamB_win';
            } else {
                match.result = 'draw';
            }
            await match.save();
        }

        res.json({
            success: true,
            message: 'Match updated successfully',
            data: { match }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMatch = async (req, res, next) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);

        if (!match) {
            return res.status(404).json({
                success: false,
                message: 'Match not found'
            });
        }

        res.json({
            success: true,
            message: 'Match deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.getUpcomingMatches = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 4;

        const matches = await Match.find({
            status: 'upcoming',
            date: { $gte: new Date() }
        })
        .sort({ date: 1 })
        .limit(limit);

        res.json({
            success: true,
            data: { matches }
        });
    } catch (error) {
        next(error);
    }
};

exports.getMatchStats = async (req, res, next) => {
    try {
        const [total, upcoming, completed, live] = await Promise.all([
            Match.countDocuments(),
            Match.countDocuments({ status: 'upcoming', date: { $gte: new Date() } }),
            Match.countDocuments({ status: 'completed' }),
            Match.countDocuments({ status: 'live' })
        ]);

        const homeWins = await Match.countDocuments({
            result: 'teamA_win',
            isHomeMatch: true
        });

        res.json({
            success: true,
            data: {
                total,
                upcoming,
                completed,
                live,
                homeWins
            }
        });
    } catch (error) {
        next(error);
    }
};
