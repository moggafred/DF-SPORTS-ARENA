const Flyer = require('../models/Flyer');
const { deleteImage } = require('../config/cloudinary');

exports.getAllFlyers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = { isActive: true };

        if (req.query.upcoming === 'true') {
            filter.date = { $gte: new Date() };
        }

        const [flyers, total] = await Promise.all([
            Flyer.find(filter)
                .sort({ date: 1 })
                .skip(skip)
                .limit(limit),
            Flyer.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: {
                flyers,
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

exports.getFlyer = async (req, res, next) => {
    try {
        const flyer = await Flyer.findById(req.params.id);

        if (!flyer) {
            return res.status(404).json({
                success: false,
                message: 'Flyer not found'
            });
        }

        res.json({
            success: true,
            data: { flyer }
        });
    } catch (error) {
        next(error);
    }
};

exports.createFlyer = async (req, res, next) => {
    try {
        const flyerData = {
            ...req.body,
            createdBy: req.user._id
        };

        if (req.file) {
            flyerData.imageUrl = req.file.path;
            flyerData.imagePublicId = req.file.filename;
        }

        const flyer = await Flyer.create(flyerData);

        res.status(201).json({
            success: true,
            message: 'Flyer created successfully',
            data: { flyer }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateFlyer = async (req, res, next) => {
    try {
        const flyer = await Flyer.findById(req.params.id);

        if (!flyer) {
            return res.status(404).json({
                success: false,
                message: 'Flyer not found'
            });
        }

        const updateData = { ...req.body };

        if (req.file) {
            if (flyer.imagePublicId) {
                await deleteImage(flyer.imagePublicId);
            }
            updateData.imageUrl = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }

        const updatedFlyer = await Flyer.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Flyer updated successfully',
            data: { flyer: updatedFlyer }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteFlyer = async (req, res, next) => {
    try {
        const flyer = await Flyer.findById(req.params.id);

        if (!flyer) {
            return res.status(404).json({
                success: false,
                message: 'Flyer not found'
            });
        }

        if (flyer.imagePublicId) {
            await deleteImage(flyer.imagePublicId);
        }

        await Flyer.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Flyer deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.toggleFlyerStatus = async (req, res, next) => {
    try {
        const flyer = await Flyer.findById(req.params.id);

        if (!flyer) {
            return res.status(404).json({
                success: false,
                message: 'Flyer not found'
            });
        }

        flyer.isActive = !flyer.isActive;
        await flyer.save();

        res.json({
            success: true,
            message: `Flyer ${flyer.isActive ? 'activated' : 'deactivated'} successfully`,
            data: { flyer }
        });
    } catch (error) {
        next(error);
    }
};
