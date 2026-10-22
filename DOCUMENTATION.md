# Natz Sports Arena - Complete Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Frontend Documentation](#frontend-documentation)
3. [Backend Documentation](#backend-documentation)
4. [Database Documentation](#database-documentation)
5. [API Reference](#api-reference)
6. [Admin Panel Guide](#admin-panel-guide)
7. [Installation Guide](#installation-guide)
8. [Configuration](#configuration)
9. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Natz Sports Arena** is a complete web application for managing a football arena in Adjumani, Uganda. It consists of:

- **Frontend**: Responsive static website (HTML/CSS/JS)
- **Backend**: RESTful API (Node.js/Express)
- **Database**: MongoDB with Mongoose ODM

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, Bootstrap 5, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT (JSON Web Tokens) |
| Storage | Cloudinary (images) |
| Notifications | Twilio (WhatsApp), Nodemailer (Email) |

---

## Frontend Documentation

### File Structure

```
DF SPORTS ARENA/
├── index.html           # Homepage
├── matches.html         # Upcoming matches
├── flyers.html          # Event flyers
├── gallery.html         # Photo gallery
├── booking.html         # Booking form
├── contact.html         # Contact page
├── css/
│   └── style.css        # Custom styles (900+ lines)
├── js/
│   ├── script.js        # Main JavaScript
│   ├── api.js           # API service layer
│   └── api-service.js   # API utilities
└── images/              # Local images
```

### Pages

#### 1. Homepage (index.html)
- Hero section with animated background
- Upcoming matches display (4 cards)
- Book pitch CTA section
- Google Maps embed
- Footer with navigation

#### 2. Matches Page (matches.html)
- Page header with breadcrumb
- Match cards rendered dynamically
- WhatsApp ticket booking integration

#### 3. Flyers Page (flyers.html)
- Grid layout of event flyers
- Click-to-open modal for preview
- Contact CTA section

#### 4. Gallery Page (gallery.html)
- Responsive photo grid
- Hover overlay effect
- Lightbox modal preview

#### 5. Booking Page (booking.html)
- Full booking form with validation
- Real-time API submission
- Pricing display
- WhatsApp fallback button
- Success confirmation modal

#### 6. Contact Page (contact.html)
- 6 contact cards
- Google Maps embed
- Social media links

### Components

#### Navigation Bar
```html
<nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <!-- Logo -->
    <!-- Mobile hamburger menu -->
    <!-- Navigation links -->
</nav>
```

#### Match Card
```html
<div class="match-card">
    <div class="card-header">
        <h4>Tournament Name</h4>
    </div>
    <div class="card-body">
        <span class="tournament-badge">Upcoming Match</span>
        <div class="teams-display">
            <span class="team-name">Team A</span>
            <span class="vs-badge">VS</span>
            <span class="team-name">Team B</span>
        </div>
        <!-- Date, Time, Booking Button -->
    </div>
</div>
```

#### Booking Form Fields
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| customerName | text | Yes | Max 100 chars |
| customerPhone | tel | Yes | - |
| customerEmail | email | No | Valid email format |
| bookingType | select | Yes | hourly/match/tournament |
| preferredDate | date | Yes | Future dates only |
| preferredTime | text | Yes | - |
| duration | select | Yes | 1-6 hours |
| numberOfPlayers | number | Yes | Min 1 |
| teamName | text | No | - |
| opponentTeam | text | No | - |
| notes | textarea | No | Max 500 chars |

### API Integration (script.js)

```javascript
// Falls back to static data if API unavailable
async function fetchFromAPI(endpoint, fallback = null) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        const data = await response.json();
        return data.success ? data.data : fallback;
    } catch (error) {
        return fallback; // Use static data
    }
}

// Load functions with API fallback
async function loadMatches() {
    const apiData = await fetchFromAPI('/matches?upcoming=true');
    const data = apiData?.matches || matchesData;
    // Render...
}
```

### CSS Variables

```css
:root {
    --primary-green: #006400;
    --dark-green: #004d00;
    --light-green: #228b22;
    --accent-gold: #ffd700;
    --black: #000000;
    --white: #ffffff;
    --gray: #6c757d;
    --light-gray: #f8f9fa;
}
```

### External Dependencies

| Library | Version | CDN |
|---------|---------|-----|
| Bootstrap | 5.3.0 | jsdelivr |
| Font Awesome | 6.4.0 | cdnjs |

---

## Backend Documentation

### File Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── cloudinary.js     # Cloudinary config
│   ├── models/
│   │   ├── index.js          # Export all models
│   │   ├── User.js           # User model
│   │   ├── Booking.js        # Booking model
│   │   ├── Match.js          # Match model
│   │   ├── Flyer.js          # Flyer model
│   │   ├── Gallery.js        # Gallery model
│   │   ├── Pricing.js        # Pricing model
│   │   └── Settings.js      # Settings model
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── bookingController.js  # Booking CRUD
│   │   ├── matchController.js    # Match CRUD
│   │   ├── flyerController.js    # Flyer CRUD
│   │   ├── galleryController.js  # Gallery CRUD
│   │   ├── pricingController.js  # Pricing CRUD
│   │   ├── settingsController.js # Settings CRUD
│   │   └── adminController.js    # Admin stats
│   ├── routes/
│   │   ├── index.js              # Route aggregator
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── bookingRoutes.js      # /api/bookings
│   │   ├── matchRoutes.js        # /api/matches
│   │   ├── flyerRoutes.js        # /api/flyers
│   │   ├── galleryRoutes.js      # /api/gallery
│   │   ├── pricingRoutes.js      # /api/pricing
│   │   ├── settingsRoutes.js     # /api/settings
│   │   └── adminRoutes.js        # /api/admin
│   ├── middleware/
│   │   ├── auth.js              # JWT auth
│   │   ├── validate.js           # Validation
│   │   ├── validators.js        # Input validators
│   │   ├── errorHandler.js      # Error handling
│   │   └── rateLimiter.js       # Rate limiting
│   ├── services/
│   │   ├── emailService.js      # Nodemailer
│   │   └── whatsappService.js   # Twilio
│   ├── utils/
│   │   ├── seed.js              # Database seeder
│   │   ├── helpers.js           # Utility functions
│   │   └── catchAsync.js        # Async wrapper
│   └── server.js                # Entry point
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── bookings.html
│   ├── matches.html
│   ├── flyers.html
│   ├── gallery.html
│   ├── pricing.html
│   ├── settings.html
│   └── js/
│       └── admin.js             # Admin API layer
├── package.json
├── .env.example
└── README.md
```

### Server Configuration (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { publicLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', publicLimiter, routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
```

### Security Features

1. **Helmet.js** - Security headers
2. **CORS** - Cross-origin request control
3. **Rate Limiting** - Prevents abuse
4. **JWT Authentication** - Secure token-based auth
5. **Input Validation** - Prevents injection attacks
6. **Password Hashing** - bcrypt with 12 rounds

---

## Database Documentation

### MongoDB Connection

```javascript
// src/config/database.js
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        process.exit(1);
    }
};
```

### Data Models

#### 1. User Model
```javascript
{
    name: String,          // Required, max 100 chars
    email: String,         // Required, unique, valid email
    password: String,      // Required, hashed, min 6 chars
    role: String,          // 'admin' | 'user', default: 'user'
    phone: String,         // Optional
    isActive: Boolean,     // default: true
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date
}
```

#### 2. Booking Model
```javascript
{
    customerName: String,      // Required, max 100 chars
    customerPhone: String,     // Required
    customerEmail: String,     // Optional, valid email
    bookingType: String,      // Required, 'hourly' | 'match' | 'tournament'
    preferredDate: Date,       // Required, future dates
    preferredTime: String,     // Required
    duration: Number,          // Required, min 1 hour
    numberOfPlayers: Number,   // Required, min 1
    eventType: String,        // Optional
    teamName: String,         // Optional
    opponentTeam: String,     // Optional
    status: String,           // 'pending' | 'confirmed' | 'cancelled' | 'completed'
    totalPrice: Number,       // Default: 0
    notes: String,           // Max 500 chars
    adminNotes: String,
    confirmedBy: ObjectId,   // Ref: User
    confirmedAt: Date,
    cancellationReason: String,
    createdAt: Date,
    updatedAt: Date
}
```

#### 3. Match Model
```javascript
{
    teamA: String,           // Required
    teamB: String,           // Required
    date: Date,              // Required
    time: String,            // Required
    tournament: String,      // Required
    venue: String,          // Default: 'Natz Sports Arena'
    status: String,         // 'upcoming' | 'live' | 'completed' | 'cancelled'
    scoreA: Number,
    scoreB: Number,
    bookingId: ObjectId,    // Ref: Booking
    isHomeMatch: Boolean,   // Default: true
    matchDayFlyer: String,
    result: String,         // 'teamA_win' | 'teamB_win' | 'draw'
    createdAt: Date,
    updatedAt: Date
}
```

#### 4. Flyer Model
```javascript
{
    title: String,           // Required, max 200 chars
    imageUrl: String,        // Required
    imagePublicId: String,   // Cloudinary ID
    date: Date,              // Required
    time: String,            // Required
    description: String,    // Max 500 chars
    location: String,        // Default: 'Natz Sports Arena, Adjumani'
    isActive: Boolean,       // Default: true
    isFeatured: Boolean,    // Default: false
    createdBy: ObjectId,    // Ref: User
    createdAt: Date,
    updatedAt: Date
}
```

#### 5. Gallery Model
```javascript
{
    imageUrl: String,        // Required
    imagePublicId: String,   // Cloudinary ID
    altText: String,        // Required, max 100 chars
    category: String,       // 'matches' | 'training' | 'events' | 'facilities' | 'general'
    isActive: Boolean,       // Default: true
    isFeatured: Boolean,    // Default: false
    uploadedBy: ObjectId,  // Ref: User
    createdAt: Date,
    updatedAt: Date
}
```

#### 6. Pricing Model
```javascript
{
    type: String,           // Required, unique, 'hourly' | 'match' | 'tournament'
    name: String,           // Required
    price: Number,          // Required, min 0
    currency: String,       // Default: 'UGX'
    description: String,
    features: [String],
    duration: String,
    isActive: Boolean,       // Default: true
    isPopular: Boolean,     // Default: false
    updatedBy: ObjectId,    // Ref: User
    createdAt: Date,
    updatedAt: Date
}
```

#### 7. Settings Model
```javascript
{
    arenaName: String,       // Default: 'Natz Sports Arena'
    tagline: String,
    phone: String,
    whatsapp: String,
    email: String,
    address: {
        street: String,
        district: String,
        country: String
    },
    location: {
        latitude: Number,
        longitude: Number
    },
    mapEmbedUrl: String,
    operatingHours: {
        open: String,       // Default: '06:00'
        close: String,      // Default: '22:00'
        days: [String]
    },
    socialLinks: {
        facebook: String,
        instagram: String,
        twitter: String,
        youtube: String
    },
    bookingSettings: {
        advanceBookingDays: Number,
        minBookingHours: Number,
        maxBookingHours: Number,
        requireDeposit: Boolean
    },
    notifications: {
        emailNotifications: Boolean,
        whatsappNotifications: Boolean
    },
    createdAt: Date,
    updatedAt: Date
}
```

### Database Indexes

```javascript
// Booking indexes
bookingSchema.index({ preferredDate: 1, preferredTime: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ customerPhone: 1 });
bookingSchema.index({ createdAt: -1 });

// Match indexes
matchSchema.index({ date: 1, status: 1 });
matchSchema.index({ tournament: 1 });

// Flyer indexes
flyerSchema.index({ date: 1, isActive: 1 });

// Gallery indexes
gallerySchema.index({ category: 1, isActive: 1 });
```

---

## API Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require:
```
Authorization: Bearer <token>
```

### Public Endpoints

#### Health Check
```
GET /api/health
```
Response:
```json
{
    "success": true,
    "message": "Natz Sports Arena API is running",
    "timestamp": "2026-04-01T12:00:00.000Z"
}
```

#### Get Upcoming Matches
```
GET /api/matches?upcoming=true&limit=4
```
Response:
```json
{
    "success": true,
    "data": {
        "matches": [
            {
                "_id": "...",
                "teamA": "DF Arena FC",
                "teamB": "Moyo United",
                "date": "2026-04-05T00:00:00.000Z",
                "time": "3:00 PM",
                "tournament": "Adjumani District League",
                "status": "upcoming"
            }
        ],
        "pagination": { "page": 1, "limit": 4, "total": 4, "pages": 1 }
    }
}
```

#### Get Flyers
```
GET /api/flyers?limit=10
```

#### Get Gallery
```
GET /api/gallery?limit=20
```

#### Check Availability
```
GET /api/bookings/availability?date=2026-04-15
```
Response:
```json
{
    "success": true,
    "data": {
        "date": "2026-04-15",
        "bookedSlots": [{ "startTime": "10:00", "duration": 2 }],
        "isAvailable": false
    }
}
```

#### Submit Booking
```
POST /api/bookings
Content-Type: application/json

{
    "customerName": "John Doe",
    "customerPhone": "+256 776 123 456",
    "customerEmail": "john@example.com",
    "bookingType": "match",
    "preferredDate": "2026-04-15",
    "preferredTime": "3:00 PM",
    "duration": 2,
    "numberOfPlayers": 22,
    "teamName": "My Team",
    "opponentTeam": "Opponent Team",
    "notes": "Need extra facilities"
}
```
Response:
```json
{
    "success": true,
    "message": "Booking submitted successfully. We will contact you shortly.",
    "data": {
        "booking": {
            "_id": "64a1b2c3d4e5f6789012345",
            "status": "pending",
            ...
        }
    }
}
```

#### Get Public Settings
```
GET /api/settings/public
```

### Protected Endpoints (Admin)

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
    "email": "admin@natzsportsarena.com",
    "password": "Admin@123"
}
```
Response:
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": { "_id": "...", "name": "Admin User", "role": "admin" },
        "token": "eyJhbGciOiJIUzI1NiIs..."
    }
}
```

#### Dashboard Stats
```
GET /api/admin/dashboard
Authorization: Bearer <token>
```
Response:
```json
{
    "success": true,
    "data": {
        "overview": {
            "totalBookings": 45,
            "pendingBookings": 5,
            "confirmedBookings": 38,
            "totalRevenue": 4500000
        },
        "recentBookings": [...],
        "bookingStats": [...]
    }
}
```

#### Create Match
```
POST /api/matches
Authorization: Bearer <token>
Content-Type: application/json

{
    "teamA": "DF Arena FC",
    "teamB": "New Team FC",
    "date": "2026-05-01",
    "time": "4:00 PM",
    "tournament": "Friendly Match"
}
```

#### Update Booking
```
PUT /api/bookings/:id
Authorization: Bearer <token>
Content-Type: application/json

{
    "status": "confirmed",
    "totalPrice": 150000,
    "adminNotes": "Confirmed for full match"
}
```

### Error Responses

```json
{
    "success": false,
    "message": "Error description"
}
```

Common HTTP status codes:
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Server Error |

---

## Admin Panel Guide

### Access
URL: `backend/admin/login.html`

### Login Credentials
```
Email: admin@natzsportsarena.com
Password: Admin@123
```

### Dashboard
- Total bookings count
- Pending bookings count
- Total revenue
- Upcoming matches count
- Recent bookings table
- Booking statistics charts

### Bookings Management
- Filter by status (pending/confirmed/cancelled/completed)
- View booking details
- Confirm pending bookings
- Cancel bookings
- Pagination support

### Matches Management
- Add new match
- Edit existing match
- Delete match
- View match details

### Flyers Management
- Add new flyer
- Upload flyer image
- Edit flyer details
- Delete flyer

### Gallery Management
- Upload images
- Set alt text
- Categorize images
- Delete images

### Pricing Management
- View all pricing tiers
- Edit price
- Update description

### Settings Management
- Arena name and tagline
- Contact information
- Operating hours
- Social media links
- Map embed URL

---

## Installation Guide

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd df-sports-arena
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

### Step 3: Environment Variables
```bash
cp .env.example .env
```

Edit `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/natzsportsarena
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=7d
```

### Step 4: Seed Database
```bash
npm run seed
```

### Step 5: Start Server
```bash
# Development
npm run dev

# Production
npm start
```

### Step 6: Frontend
Open `index.html` in browser, or:
```bash
npx serve .
```

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 5000) |
| `MONGODB_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | JWT signing secret |
| `JWT_EXPIRES_IN` | No | Token expiry (default: 7d) |
| `CLOUDINARY_*` | No | Cloudinary credentials |
| `TWILIO_*` | No | Twilio WhatsApp credentials |
| `SMTP_*` | No | Email credentials |
| `ARENA_PHONE` | No | Arena phone number |
| `ARENA_EMAIL` | No | Arena email |
| `FRONTEND_URL` | No | Frontend URL for CORS |

### Getting MongoDB URI

1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Click Connect > Connect your application
4. Copy connection string
5. Replace `<password>` with your user password

### Cloudinary Setup (Optional)

1. Sign up at cloudinary.com
2. Copy credentials from Dashboard
3. Add to `.env`

### Twilio Setup (Optional)

1. Sign up at twilio.com
2. Get Account SID and Auth Token
3. Enable WhatsApp sandbox or get Business API
4. Add to `.env`

---

## Troubleshooting

### MongoDB Connection Failed
```
Error: MongoNetworkError: Failed to connect to server
```
**Solution:**
- Check MongoDB URI is correct
- Whitelist your IP in Atlas
- Check internet connection

### CORS Error
```
Access-Control-Allow-Origin blocked
```
**Solution:**
- Set `FRONTEND_URL` in `.env`
- Ensure frontend URL matches exactly

### JWT Token Invalid
```
Error: JsonWebTokenError: invalid token
```
**Solution:**
- Clear browser localStorage
- Login again to get new token
- Check JWT_SECRET matches

### Image Upload Failed
```
Error: File too large
```
**Solution:**
- Max file size is 5MB
- Supported formats: jpg, png, webp

### WhatsApp Not Sending
```
Error: Twilio not configured
```
**Solution:**
- Add Twilio credentials to `.env`
- Ensure WhatsApp sandbox is configured

### Frontend API Not Loading
The frontend works without backend - it uses static data as fallback.

---

## File Locations Summary

| File | Location | Purpose |
|------|----------|---------|
| Server | `backend/src/server.js` | Express server |
| Models | `backend/src/models/` | MongoDB schemas |
| Routes | `backend/src/routes/` | API endpoints |
| Controllers | `backend/src/controllers/` | Business logic |
| Admin JS | `backend/admin/js/admin.js` | Admin API calls |
| Frontend JS | `js/script.js` | Main frontend logic |
| Styles | `css/style.css` | All CSS styles |
| Database Seed | `backend/src/utils/seed.js` | Sample data |

---

## Support

For questions or issues:
- Email: info@natzsportsarena.com
- Phone: +256 776 057 501
- WhatsApp: +256 776 057 501

---

**Documentation Version:** 1.0.0
**Last Updated:** April 2026
