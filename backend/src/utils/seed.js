require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Booking = require('../models/Booking');
const Match = require('../models/Match');
const Flyer = require('../models/Flyer');
const Gallery = require('../models/Gallery');
const Pricing = require('../models/Pricing');
const Settings = require('../models/Settings');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await User.deleteMany({});
        await Booking.deleteMany({});
        await Match.deleteMany({});
        await Flyer.deleteMany({});
        await Gallery.deleteMany({});
        await Pricing.deleteMany({});
        await Settings.deleteMany({});

        console.log('Cleared existing data');

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@dfsportsarena.com',
            password: 'Admin@123',
            role: 'admin',
            phone: '+256 776 057 501'
        });
        console.log('Admin user created:', adminUser.email);

        await Pricing.create([
            {
                type: 'hourly',
                name: 'Hourly Booking',
                price: 50000,
                currency: 'UGX',
                description: 'Perfect for training sessions and practice matches',
                features: ['1 hour of pitch time', 'Access to changing rooms', 'Basic lighting'],
                duration: '1 hour',
                isActive: true,
                isPopular: false
            },
            {
                type: 'match',
                name: 'Full Match',
                price: 150000,
                currency: 'UGX',
                description: 'Full match with changing rooms and facilities',
                features: ['2-3 hours of pitch time', 'Full changing room access', 'Floodlights included', 'Water available'],
                duration: '2-3 hours',
                isActive: true,
                isPopular: true
            },
            {
                type: 'tournament',
                name: 'Tournament',
                price: 500000,
                currency: 'UGX',
                description: 'Full day or multi-day events',
                features: ['Full day access', 'All facilities included', 'Dedicated staff', 'Catering options available', 'Prize ceremony space'],
                duration: 'Full day',
                isActive: true,
                isPopular: false
            }
        ]);
        console.log('Pricing tiers created');

        const currentDate = new Date();
        
        await Match.create([
            {
                teamA: 'DF Arena FC',
                teamB: 'Moyo United',
                date: new Date('2026-04-05'),
                time: '3:00 PM',
                tournament: 'Adjumani District League',
                venue: 'DF Sports Arena',
                status: 'upcoming',
                isHomeMatch: true
            },
            {
                teamA: 'DF Arena FC',
                teamB: 'Rhino FC',
                date: new Date('2026-04-12'),
                time: '4:00 PM',
                tournament: 'DF Cup 2026',
                venue: 'DF Sports Arena',
                status: 'upcoming',
                isHomeMatch: true
            },
            {
                teamA: 'DF Arena FC',
                teamB: 'Nyapea Stars',
                date: new Date('2026-04-19'),
                time: '3:30 PM',
                tournament: 'Inter-Community Cup',
                venue: 'DF Sports Arena',
                status: 'upcoming',
                isHomeMatch: true
            },
            {
                teamA: 'DF Arena FC',
                teamB: 'Ciforo FC',
                date: new Date('2026-04-26'),
                time: '2:00 PM',
                tournament: 'Adjumani District League',
                venue: 'DF Sports Arena',
                status: 'upcoming',
                isHomeMatch: true
            }
        ]);
        console.log('Matches created');

        await Flyer.create([
            {
                title: 'DF Cup Grand Final',
                imageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                date: new Date('2026-04-15'),
                time: '3:00 PM',
                description: 'The biggest football event of the year! Watch the best teams compete for glory.',
                location: 'DF Sports Arena, Adjumani',
                isActive: true,
                isFeatured: true,
                createdBy: adminUser._id
            },
            {
                title: 'Inter-Community Championship',
                imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                date: new Date('2026-04-22'),
                time: '4:00 PM',
                description: 'Communities compete for the championship trophy',
                location: 'DF Sports Arena, Adjumani',
                isActive: true,
                createdBy: adminUser._id
            },
            {
                title: 'Youth League Opening',
                imageUrl: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                date: new Date('2026-05-01'),
                time: '2:00 PM',
                description: 'Opening ceremony for the new youth football league season',
                location: 'DF Sports Arena, Adjumani',
                isActive: true,
                createdBy: adminUser._id
            },
            {
                title: 'DF Arena vs Rhino FC',
                imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                date: new Date('2026-05-08'),
                time: '3:30 PM',
                description: 'Epic showdown between two football giants',
                location: 'DF Sports Arena, Adjumani',
                isActive: true,
                createdBy: adminUser._id
            },
            {
                title: 'Charity Match Day',
                imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                date: new Date('2026-05-15'),
                time: '2:00 PM',
                description: 'Football for a cause - all proceeds support local communities',
                location: 'DF Sports Arena, Adjumani',
                isActive: true,
                createdBy: adminUser._id
            },
            {
                title: 'Semi-Final Showdown',
                imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                date: new Date('2026-05-22'),
                time: '4:00 PM',
                description: 'Semi-final matches in the DF Cup tournament',
                location: 'DF Sports Arena, Adjumani',
                isActive: true,
                createdBy: adminUser._id
            }
        ]);
        console.log('Flyers created');

        await Gallery.create([
            {
                imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Football match at DF Arena',
                category: 'matches',
                isActive: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'DF Cup celebration',
                category: 'events',
                isActive: true,
                isFeatured: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Football pitch view',
                category: 'facilities',
                isActive: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Youth training session',
                category: 'training',
                isActive: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Match action',
                category: 'matches',
                isActive: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Stadium atmosphere',
                category: 'events',
                isActive: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Team celebration',
                category: 'matches',
                isActive: true,
                uploadedBy: adminUser._id
            },
            {
                imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                altText: 'Goal celebration',
                category: 'matches',
                isActive: true,
                isFeatured: true,
                uploadedBy: adminUser._id
            }
        ]);
        console.log('Gallery images created');

        await Settings.create({
            arenaName: 'DF Sports Arena',
            tagline: 'Home of Football in Adjumani, Uganda',
            phone: '+256 776 057 501',
            whatsapp: '256776057501',
            email: 'info@dfsportsarena.com',
            address: {
                street: 'Adjumani Town',
                district: 'Adjumani District',
                country: 'Uganda'
            },
            location: {
                latitude: 3.3784,
                longitude: 31.9474
            },
            mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31904.37673959257!2d31.92!3d3.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1772884f1a05a275%3A0x71e46c57e02eea6!2sAdjumani%2C%20Uganda!5e0!3m2!1sen!2s!4v1704067200000!5m2!1sen!2s',
            operatingHours: {
                open: '06:00',
                close: '22:00',
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            socialLinks: {
                facebook: 'https://facebook.com/dfsportsarena',
                instagram: 'https://instagram.com/dfsportsarena'
            },
            bookingSettings: {
                advanceBookingDays: 30,
                minBookingHours: 1,
                maxBookingHours: 12,
                requireDeposit: false
            },
            notifications: {
                emailNotifications: true,
                whatsappNotifications: true
            }
        });
        console.log('Settings created');

        console.log('\n========================================');
        console.log('Database seeded successfully!');
        console.log('========================================');
        console.log('\nAdmin Login Credentials:');
        console.log('Email: admin@dfsportsarena.com');
        console.log('Password: Admin@123');
        console.log('========================================\n');

        await mongoose.connection.close();
        console.log('Database connection closed');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
