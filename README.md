# Natz Sports Arena Website

A complete website for Natz Sports Arena - a football arena located in Adjumani, Uganda. This project includes both a static frontend website and a full backend API for managing bookings, matches, and content.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Admin Panel](#admin-panel)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Project Overview

Natz Sports Arena is a responsive website for managing a football arena, featuring:
- Public website for visitors to view matches, flyers, and gallery
- Online booking system for pitch reservations
- Admin dashboard for managing content and bookings
- WhatsApp integration for quick bookings and notifications

## Features

### Public Website
- **Homepage** - Hero section, upcoming matches, booking CTA
- **Matches** - Upcoming matches with ticket booking
- **Flyers** - Event flyers gallery
- **Gallery** - Photo gallery with lightbox
- **Booking** - Full booking form with API integration
- **Contact** - Contact information and location map

### Backend API
- RESTful API with Node.js/Express
- MongoDB database with Mongoose ODM
- JWT authentication
- Email and WhatsApp notifications
- Image upload with Cloudinary

### Admin Dashboard
- Dashboard with statistics
- Booking management (approve/cancel)
- Match scheduling
- Flyer management
- Gallery management
- Pricing configuration
- Settings management

## Project Structure

```
DF SPORTS ARENA/
├── index.html              # Homepage
├── matches.html            # Matches page
├── flyers.html             # Event flyers page
├── gallery.html            # Photo gallery
├── booking.html            # Booking form
├── contact.html            # Contact page
├── css/
│   └── style.css           # Custom styles
├── js/
│   ├── script.js           # Main JavaScript
│   ├── api.js              # API service layer
│   └── api-service.js      # API utilities
├── images/                 # Local images
└── backend/               # Backend API
    ├── src/
    │   ├── config/         # Database & cloud config
    │   ├── models/         # MongoDB models
    │   ├── controllers/    # Route controllers
    │   ├── routes/         # API routes
    │   ├── middleware/     # Auth, validation
    │   ├── services/       # Email, WhatsApp
    │   ├── utils/          # Helpers, seed script
    │   └── server.js       # Entry point
    ├── admin/              # Admin dashboard
    ├── package.json
    └── README.md
```

## Frontend Setup

The frontend is a static website that works independently but can integrate with the backend API.

### Running Locally

1. Simply open `index.html` in a browser, or

2. Use a local server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:3000
```

3. Visit `http://localhost:3000`

## Backend Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier available)
- Cloudinary account (optional, for image uploads)
- Twilio account (optional, for WhatsApp)

### Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Configure environment variables** in `.env`

5. **Seed the database** (creates admin user and sample data):
```bash
npm run seed
```

6. **Start the server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

7. **Server runs on:** `http://localhost:5000`

## Admin Panel

### Access
- Go to: `backend/admin/login.html`

### Default Credentials
After running `npm run seed`:
- **Email:** `admin@natzsportsarena.com`
- **Password:** `Admin@123`

### Admin Features

| Page | Features |
|------|----------|
| Dashboard | Statistics, recent bookings, revenue |
| Bookings | View, approve, cancel bookings |
| Matches | Add, edit, delete matches |
| Flyers | Add, edit, delete event flyers |
| Gallery | Upload, delete gallery images |
| Pricing | Update pricing tiers |
| Settings | Arena settings, contact info |

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/matches?upcoming=true` | List upcoming matches |
| GET | `/flyers` | List active flyers |
| GET | `/gallery` | List gallery images |
| POST | `/bookings` | Submit booking |
| GET | `/bookings/availability?date=YYYY-MM-DD` | Check availability |
| GET | `/settings/public` | Get public settings |

### Protected Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Admin login |
| GET | `/admin/dashboard` | Dashboard stats |
| GET/POST/PUT/DELETE | `/bookings` | Booking management |
| GET/POST/PUT/DELETE | `/matches` | Match management |
| GET/POST/PUT/DELETE | `/flyers` | Flyer management |
| GET/POST/DELETE | `/gallery` | Gallery management |
| GET/PUT | `/pricing` | Pricing management |
| GET/PUT | `/settings` | Settings management |

## Environment Variables

Create `.env` in `backend/` directory:

```env
# Server
NODE_ENV=development
PORT=5000

# MongoDB (Required)
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/natzsportsarena

# JWT (Required)
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret

# Twilio WhatsApp (Optional)
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_WHATSAPP_FROM=+14155238886

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Arena Contact
ARENA_PHONE=+256788980631
ARENA_WHATSAPP=256788980631
ARENA_EMAIL=info@natzsportsarena.com
FRONTEND_URL=http://localhost:3000
```

## Deployment

### Frontend
Deploy static files to Netlify, Vercel, GitHub Pages, or any static hosting.

### Backend
Deploy to Railway, Render, Heroku, or any Node.js hosting.

---

Built with ❤️ for Natz Sports Arena, Adjumani, Uganda
