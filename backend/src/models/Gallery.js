const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    imagePublicId: {
        type: String
    },
    altText: {
        type: String,
        required: [true, 'Alt text is required'],
        trim: true,
        maxlength: [100, 'Alt text cannot exceed 100 characters']
    },
    category: {
        type: String,
        enum: ['matches', 'training', 'events', 'facilities', 'general'],
        default: 'general'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

gallerySchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
