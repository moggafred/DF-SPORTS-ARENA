# DF Sports Arena Backend

Complete backend API for DF Sports Arena website built with Node.js, Express, and MongoDB.

## Features

- **User Authentication** - JWT-based auth with admin/user roles
- **Booking Management** - Full CRUD for pitch bookings
- **Match Management** - Schedule and track matches
- **Flyer Management** - Event flyers with image upload
- **Gallery Management** - Photo gallery with categories
- **Pricing Management** - Configurable pricing tiers
- **Settings Management** - Arena settings and contact info
- **Email Notifications** - Booking confirmations via email
- **WhatsApp Integration** - Twilio WhatsApp notifications
- **Image Upload** - Cloudinary integration

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (image storage)
- Twilio (WhatsApp)
- Nodemailer (emails)
- Express Rate Limiting
- Helmet.js (security)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account (optional)
- Twilio account (optional)

### Installation

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_FROM=+14155238886
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ARENA_PHONE=+256776057501
ARENA_WHATSAPP=256776057501
ARENA_EMAIL=info@dfsportsarena.com
FRONTEND_URL=http://localhost:3000
```

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start

# Seed database with sample data
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Bookings
- `GET /api/bookings` - List bookings (admin)
- `GET /api/bookings/public` - Public booking info
- `GET /api/bookings/availability` - Check availability
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Matches
- `GET /api/matches` - List matches
- `GET /api/matches/upcoming` - Get upcoming matches
- `POST /api/matches` - Create match (admin)
- `PUT /api/matches/:id` - Update match
- `DELETE /api/matches/:id` - Delete match

### Flyers
- `GET /api/flyers` - List flyers
- `POST /api/flyers` - Create flyer (admin)
- `PUT /api/flyers/:id` - Update flyer
- `DELETE /api/flyers/:id` - Delete flyer

### Gallery
- `GET /api/gallery` - List images
- `POST /api/gallery` - Upload image (admin)
- `DELETE /api/gallery/:id` - Delete image

### Pricing
- `GET /api/pricing` - Get pricing
- `PUT /api/pricing/:id` - Update pricing (admin)

### Settings
- `GET /api/settings` - Get settings (admin)
- `GET /api/settings/public` - Get public settings
- `PUT /api/settings` - Update settings (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id` - Update user

## Admin Panel

Access the admin panel at: `backend/admin/`

Default credentials after seeding:
- **Email:** admin@dfsportsarena.com
- **Password:** Admin@123

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── admin/
│   ├── js/
│   └── *.html
├── .env.example
├── package.json
└── README.md
```

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on public routes
- CORS configuration
- Helmet.js security headers
- Input validation
- MongoDB injection prevention

## License

MIT
