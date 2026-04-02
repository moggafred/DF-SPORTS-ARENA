const Gallery = require('../models/Gallery');
const { deleteImage } = require('../config/cloudinary');

exports.getAllImages = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = { isActive: true };

        if (req.query.category) {
            filter.category = req.query.category;
        }

        const [images, total] = await Promise.all([
            Gallery.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Gallery.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: {
                images,
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

exports.getImage = async (req, res, next) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        res.json({
            success: true,
            data: { image }
        });
    } catch (error) {
        next(error);
    }
};

exports.uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        const imageData = {
            imageUrl: req.file.path,
            imagePublicId: req.file.filename,
            uploadedBy: req.user._id
        };

        if (req.body.altText) {
            imageData.altText = req.body.altText;
        }

        if (req.body.category) {
            imageData.category = req.body.category;
        }

        const image = await Gallery.create(imageData);

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: { image }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateImage = async (req, res, next) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        const updateData = {};

        if (req.body.altText) updateData.altText = req.body.altText;
        if (req.body.category) updateData.category = req.body.category;
        if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured;

        if (req.file) {
            if (image.imagePublicId) {
                await deleteImage(image.imagePublicId);
            }
            updateData.imageUrl = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }

        const updatedImage = await Gallery.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Image updated successfully',
            data: { image: updatedImage }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteImage = async (req, res, next) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        if (image.imagePublicId) {
            await deleteImage(image.imagePublicId);
        }

        await Gallery.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Gallery.distinct('category', { isActive: true });

        res.json({
            success: true,
            data: { categories }
        });
    } catch (error) {
        next(error);
    }
};
