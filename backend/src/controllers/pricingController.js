const Pricing = require('../models/Pricing');

exports.getAllPricing = async (req, res, next) => {
    try {
        const pricing = await Pricing.find({ isActive: true })
            .sort({ type: 1 });

        res.json({
            success: true,
            data: { pricing }
        });
    } catch (error) {
        next(error);
    }
};

exports.getPricing = async (req, res, next) => {
    try {
        const pricing = await Pricing.findById(req.params.id);

        if (!pricing) {
            return res.status(404).json({
                success: false,
                message: 'Pricing not found'
            });
        }

        res.json({
            success: true,
            data: { pricing }
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePricing = async (req, res, next) => {
    try {
        const updateData = {
            ...req.body,
            updatedBy: req.user._id
        };

        const pricing = await Pricing.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!pricing) {
            return res.status(404).json({
                success: false,
                message: 'Pricing not found'
            });
        }

        res.json({
            success: true,
            message: 'Pricing updated successfully',
            data: { pricing }
        });
    } catch (error) {
        next(error);
    }
};

exports.createPricing = async (req, res, next) => {
    try {
        const pricingData = {
            ...req.body,
            updatedBy: req.user._id
        };

        const pricing = await Pricing.create(pricingData);

        res.status(201).json({
            success: true,
            message: 'Pricing created successfully',
            data: { pricing }
        });
    } catch (error) {
        next(error);
    }
};
