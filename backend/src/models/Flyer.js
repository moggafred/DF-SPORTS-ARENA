const mongoose = require('mongoose');

const flyerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Flyer title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
    },
    imagePublicId: {
        type: String
    },
    date: {
        type: Date,
        required: [true, 'Event date is required']
    },
    time: {
        type: String,
        required: [true, 'Event time is required']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    location: {
        type: String,
        default: 'Natz Sports Arena, Adjumani'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

flyerSchema.index({ date: 1, isActive: 1 });

flyerSchema.virtual('formattedDate').get(function() {
    return new Date(this.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

flyerSchema.set('toJSON', { virtuals: true });
flyerSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Flyer', flyerSchema);
