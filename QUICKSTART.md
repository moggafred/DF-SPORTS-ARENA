# Quick Start Guide

## DF Sports Arena - Complete Setup

Follow these steps to get your project running locally.

## Step 1: Install Node.js

Download and install Node.js 18+ from [nodejs.org](https://nodejs.org)

## Step 2: Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your database user password

## Step 3: Set Up Backend

```bash
# Go to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB URI

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

## Step 4: Open Frontend

```bash
# Go back to project root
cd ..

# Open in browser or use local server
npx serve .
```

## Step 5: Access Admin Panel

1. Go to `backend/admin/login.html`
2. Login with:
   - Email: `admin@dfsportsarena.com`
   - Password: `Admin@123`

## Optional: Enable WhatsApp Notifications

1. Create Twilio account at [twilio.com](https://www.twilio.com)
2. Get Account SID and Auth Token
3. Add to `.env`:
```
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
```

## Optional: Enable Image Uploads

1. Create Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get Cloud Name, API Key, API Secret
3. Add to `.env`:
```
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

## Quick Commands

| Command | Description |
|---------|-------------|
| `cd backend` | Go to backend |
| `npm install` | Install dependencies |
| `npm run seed` | Seed database |
| `npm run dev` | Start dev server |
| `npm start` | Start production server |

## File Locations

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `booking.html` | Booking form |
| `backend/admin/login.html` | Admin login |
| `backend/admin/dashboard.html` | Admin dashboard |
| `backend/src/server.js` | API server |
| `backend/src/utils/seed.js` | Database seeder |

## Default Admin Login

```
Email: admin@dfsportsarena.com
Password: Admin@123
```

## Need Help?

- Check the full README.md for detailed documentation
- Contact: info@dfsportsarena.com
