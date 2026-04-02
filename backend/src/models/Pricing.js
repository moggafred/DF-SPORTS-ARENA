const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Pricing type is required'],
        enum: {
            values: ['hourly', 'match', 'tournament'],
            message: 'Invalid pricing type'
        },
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    currency: {
        type: String,
        default: 'UGX'
    },
    description: {
        type: String,
        trim: true
    },
    features: [{
        type: String,
        trim: true
    }],
    duration: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
