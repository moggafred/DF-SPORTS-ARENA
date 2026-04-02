const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    customerPhone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    customerEmail: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    bookingType: {
        type: String,
        required: [true, 'Booking type is required'],
        enum: {
            values: ['hourly', 'match', 'tournament'],
            message: 'Invalid booking type'
        }
    },
    preferredDate: {
        type: Date,
        required: [true, 'Preferred date is required']
    },
    preferredTime: {
        type: String,
        required: [true, 'Preferred time is required']
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 hour']
    },
    numberOfPlayers: {
        type: Number,
        required: [true, 'Number of players is required'],
        min: [1, 'Must have at least 1 player']
    },
    eventType: {
        type: String,
        trim: true
    },
    teamName: {
        type: String,
        trim: true
    },
    opponentTeam: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    adminNotes: {
        type: String,
        trim: true
    },
    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmedAt: {
        type: Date
    },
    cancellationReason: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

bookingSchema.index({ preferredDate: 1, preferredTime: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ customerPhone: 1 });
bookingSchema.index({ createdAt: -1 });

bookingSchema.virtual('formattedDate').get(function() {
    return new Date(this.preferredDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

bookingSchema.set('toJSON', { virtuals: true });
bookingSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Booking', bookingSchema);
