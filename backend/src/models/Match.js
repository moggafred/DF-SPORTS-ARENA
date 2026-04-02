const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    teamA: {
        type: String,
        required: [true, 'Team A name is required'],
        trim: true
    },
    teamB: {
        type: String,
        required: [true, 'Team B name is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Match date is required']
    },
    time: {
        type: String,
        required: [true, 'Match time is required']
    },
    tournament: {
        type: String,
        required: [true, 'Tournament name is required'],
        trim: true
    },
    venue: {
        type: String,
        default: 'DF Sports Arena'
    },
    status: {
        type: String,
        enum: ['upcoming', 'live', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    scoreA: {
        type: Number,
        default: null
    },
    scoreB: {
        type: Number,
        default: null
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
    isHomeMatch: {
        type: Boolean,
        default: true
    },
    matchDayFlyer: {
        type: String
    },
    result: {
        type: String,
        enum: ['teamA_win', 'teamB_win', 'draw', null],
        default: null
    }
}, {
    timestamps: true
});

matchSchema.index({ date: 1, status: 1 });
matchSchema.index({ tournament: 1 });

matchSchema.virtual('formattedDate').get(function() {
    return new Date(this.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

matchSchema.set('toJSON', { virtuals: true });
matchSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Match', matchSchema);
