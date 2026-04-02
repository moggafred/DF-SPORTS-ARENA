const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    arenaName: {
        type: String,
        default: 'DF Sports Arena'
    },
    tagline: {
        type: String,
        default: 'Home of Football in Adjumani, Uganda'
    },
    phone: {
        type: String,
        default: '+256 776 057 501'
    },
    whatsapp: {
        type: String,
        default: '256776057501'
    },
    email: {
        type: String,
        default: 'info@dfsportsarena.com'
    },
    address: {
        street: {
            type: String,
            default: 'Adjumani Town'
        },
        district: {
            type: String,
            default: 'Adjumani District'
        },
        country: {
            type: String,
            default: 'Uganda'
        }
    },
    location: {
        latitude: {
            type: Number,
            default: 3.3784
        },
        longitude: {
            type: Number,
            default: 31.9474
        }
    },
    mapEmbedUrl: {
        type: String
    },
    operatingHours: {
        open: {
            type: String,
            default: '06:00'
        },
        close: {
            type: String,
            default: '22:00'
        },
        days: {
            type: [String],
            default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
    },
    socialLinks: {
        facebook: {
            type: String,
            default: 'https://facebook.com/dfsportsarena'
        },
        instagram: {
            type: String,
            default: 'https://instagram.com/dfsportsarena'
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        }
    },
    bookingSettings: {
        advanceBookingDays: {
            type: Number,
            default: 30
        },
        minBookingHours: {
            type: Number,
            default: 1
        },
        maxBookingHours: {
            type: Number,
            default: 12
        },
        requireDeposit: {
            type: Boolean,
            default: false
        }
    },
    notifications: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        whatsappNotifications: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
