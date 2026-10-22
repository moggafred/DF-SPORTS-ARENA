const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    arenaName: {
        type: String,
        default: 'Natz Sports Arena'
    },
    tagline: {
        type: String,
        default: 'Home of Football in Adjumani, Uganda'
    },
    phone: {
        type: String,
        default: '+256 788 980 631'
    },
    whatsapp: {
        type: String,
        default: '256788980631'
    },
    email: {
        type: String,
        default: 'info@natzsportsarena.com'
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
            default: 'https://facebook.com/natzsportsarena'
        },
        instagram: {
            type: String,
            default: 'https://instagram.com/natzsportsarena'
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        },
        linkedin: {
            type: String,
            default: 'https://linkedin.com/company/natzsportsarena'
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
