# DF Sports Arena - API Documentation

## Base Information

| Item | Value |
|------|-------|
| Base URL | `http://localhost:5000/api` |
| Content-Type | `application/json` |
| Authentication | Bearer Token (JWT) |

---

## Authentication

### Login
```
POST /api/auth/login
```

**Request:**
```json
{
    "email": "admin@dfsportsarena.com",
    "password": "Admin@123"
}
```

**Response (200):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "_id": "64a1b2c3d4e5f6789012345",
            "name": "Admin User",
            "email": "admin@dfsportsarena.com",
            "role": "admin",
            "isActive": true
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

**Response (401):**
```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

### Register
```
POST /api/auth/register
```

**Request:**
```json
{
    "name": "New User",
    "email": "user@example.com",
    "password": "password123",
    "phone": "+256 776 123 456"
}
```

**Response (201):**
```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "user": { ... },
        "token": "eyJhbGciOiJIUzI1NiIs..."
    }
}
```

---

### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "user": {
            "_id": "...",
            "name": "Admin User",
            "email": "admin@dfsportsarena.com",
            "role": "admin"
        }
    }
}
```

---

## Bookings

### Public Endpoints

#### Submit Booking
```
POST /api/bookings
```

**Request:**
```json
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
    "opponentTeam": "Opponent FC",
    "notes": "Need changing rooms"
}
```

**Validation Rules:**
| Field | Rules |
|-------|-------|
| customerName | Required, max 100 chars |
| customerPhone | Required |
| customerEmail | Valid email format |
| bookingType | Required: hourly, match, tournament |
| preferredDate | Required, future dates only |
| preferredTime | Required |
| duration | Required, min 1 |
| numberOfPlayers | Required, min 1 |
| notes | Max 500 chars |

**Response (201):**
```json
{
    "success": true,
    "message": "Booking submitted successfully. We will contact you shortly.",
    "data": {
        "booking": {
            "_id": "64a1b2c3d4e5f6789012345",
            "customerName": "John Doe",
            "status": "pending",
            "createdAt": "2026-04-01T12:00:00.000Z"
        }
    }
}
```

---

#### Check Availability
```
GET /api/bookings/availability?date=2026-04-15
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "date": "2026-04-15",
        "bookedSlots": [
            { "startTime": "10:00 AM", "duration": 2 },
            { "startTime": "3:00 PM", "duration": 3 }
        ],
        "isAvailable": false
    }
}
```

---

#### Get Public Booking Info
```
GET /api/bookings/public
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "pricing": [
            {
                "_id": "...",
                "type": "hourly",
                "name": "Hourly Booking",
                "price": 50000,
                "currency": "UGX"
            }
        ],
        "settings": {
            "operatingHours": {
                "open": "06:00",
                "close": "22:00"
            },
            "advanceBookingDays": 30,
            "whatsapp": "256776057501",
            "phone": "+256 776 057 501"
        }
    }
}
```

---

### Protected Endpoints (Admin)

#### List All Bookings
```
GET /api/bookings?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| page | int | Page number (default: 1) |
| limit | int | Items per page (default: 10, max: 100) |
| status | string | Filter by status |
| bookingType | string | Filter by type |
| startDate | date | Filter start date |
| endDate | date | Filter end date |

**Response (200):**
```json
{
    "success": true,
    "data": {
        "bookings": [...],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 45,
            "pages": 5
        }
    }
}
```

---

#### Get Single Booking
```
GET /api/bookings/:id
Authorization: Bearer <token>
```

---

#### Update Booking
```
PUT /api/bookings/:id
Authorization: Bearer <token>
```

**Request:**
```json
{
    "status": "confirmed",
    "totalPrice": 150000,
    "adminNotes": "Booking confirmed via phone call"
}
```

**Allowed Status Values:** `pending`, `confirmed`, `cancelled`, `completed`

---

#### Cancel Booking
```
POST /api/bookings/:id/cancel
Authorization: Bearer <token>
```

**Request:**
```json
{
    "cancellationReason": "Customer requested cancellation"
}
```

---

#### Delete Booking
```
DELETE /api/bookings/:id
Authorization: Bearer <token>
```

---

#### Get Booking Stats
```
GET /api/bookings/stats
Authorization: Bearer <token>
```

---

## Matches

### Public Endpoints

#### List Matches
```
GET /api/matches?upcoming=true&limit=10
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| upcoming | boolean | Show only upcoming matches |
| status | string | Filter by status |
| tournament | string | Filter by tournament name |
| page | int | Page number |
| limit | int | Items per page |

**Response (200):**
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
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 4,
            "pages": 1
        }
    }
}
```

---

#### Get Upcoming Matches
```
GET /api/matches/upcoming?limit=4
```

---

### Protected Endpoints (Admin)

#### Create Match
```
POST /api/matches
Authorization: Bearer <token>
```

**Request:**
```json
{
    "teamA": "DF Arena FC",
    "teamB": "New Opponent FC",
    "date": "2026-05-01",
    "time": "4:00 PM",
    "tournament": "Friendly Match",
    "venue": "DF Sports Arena",
    "isHomeMatch": true
}
```

---

#### Update Match
```
PUT /api/matches/:id
Authorization: Bearer <token>
```

**Request:**
```json
{
    "status": "live",
    "scoreA": 2,
    "scoreB": 1
}
```

**Allowed Status:** `upcoming`, `live`, `completed`, `cancelled`

---

#### Delete Match
```
DELETE /api/matches/:id
Authorization: Bearer <token>
```

---

## Flyers

### List Flyers
```
GET /api/flyers?limit=10
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "flyers": [
            {
                "_id": "...",
                "title": "DF Cup Grand Final",
                "imageUrl": "https://...",
                "date": "2026-04-15T00:00:00.000Z",
                "time": "3:00 PM",
                "description": "...",
                "isActive": true
            }
        ],
        "pagination": { ... }
    }
}
```

---

### Protected Endpoints (Admin)

#### Create Flyer
```
POST /api/flyers
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
| Field | Type | Required |
|-------|------|----------|
| title | text | Yes |
| image | file | No |
| imageUrl | text | No |
| date | date | Yes |
| time | text | Yes |
| description | text | No |

---

#### Update Flyer
```
PUT /api/flyers/:id
Authorization: Bearer <token>
```

---

#### Delete Flyer
```
DELETE /api/flyers/:id
Authorization: Bearer <token>
```

---

## Gallery

### List Gallery
```
GET /api/gallery?limit=20&category=matches
```

**Categories:** `matches`, `training`, `events`, `facilities`, `general`

---

### Protected Endpoints (Admin)

#### Upload Image
```
POST /api/gallery
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
| Field | Type | Required |
|-------|------|----------|
| image | file | Yes |
| altText | text | Yes |
| category | select | No |

---

#### Delete Image
```
DELETE /api/gallery/:id
Authorization: Bearer <token>
```

---

## Pricing

### Get Pricing
```
GET /api/pricing
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "pricing": [
            {
                "_id": "...",
                "type": "hourly",
                "name": "Hourly Booking",
                "price": 50000,
                "currency": "UGX",
                "description": "Perfect for training sessions",
                "duration": "1 hour",
                "isPopular": false
            },
            {
                "_id": "...",
                "type": "match",
                "name": "Full Match",
                "price": 150000,
                "currency": "UGX",
                "description": "Full match with facilities",
                "duration": "2-3 hours",
                "isPopular": true
            },
            {
                "_id": "...",
                "type": "tournament",
                "name": "Tournament",
                "price": 500000,
                "currency": "UGX",
                "description": "Full day events",
                "duration": "Full day",
                "isPopular": false
            }
        ]
    }
}
```

---

### Protected Endpoints (Admin)

#### Update Pricing
```
PUT /api/pricing/:id
Authorization: Bearer <token>
```

**Request:**
```json
{
    "price": 175000,
    "description": "Updated description"
}
```

---

## Settings

### Get Public Settings
```
GET /api/settings/public
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "settings": {
            "arenaName": "DF Sports Arena",
            "tagline": "Home of Football in Adjumani, Uganda",
            "phone": "+256 776 057 501",
            "whatsapp": "256776057501",
            "email": "info@dfsportsarena.com",
            "address": {
                "street": "Adjumani Town",
                "district": "Adjumani District",
                "country": "Uganda"
            },
            "operatingHours": {
                "open": "06:00",
                "close": "22:00",
                "days": ["Monday", "Tuesday", ...]
            },
            "socialLinks": {
                "facebook": "https://facebook.com/dfsportsarena",
                "instagram": "https://instagram.com/dfsportsarena"
            }
        }
    }
}
```

---

### Protected Endpoints (Admin)

#### Get Settings
```
GET /api/settings
Authorization: Bearer <token>
```

---

#### Update Settings
```
PUT /api/settings
Authorization: Bearer <token>
```

**Request:**
```json
{
    "arenaName": "DF Sports Arena",
    "tagline": "New Tagline",
    "phone": "+256 776 999 999",
    "whatsapp": "256776999999",
    "email": "newemail@dfsportsarena.com",
    "address": {
        "street": "New Street",
        "district": "New District",
        "country": "Uganda"
    },
    "operatingHours": {
        "open": "07:00",
        "close": "21:00"
    },
    "socialLinks": {
        "facebook": "https://facebook.com/newpage",
        "instagram": "https://instagram.com/newpage"
    }
}
```

---

## Admin Dashboard

### Get Dashboard Stats
```
GET /api/admin/dashboard
Authorization: Bearer <token>
```

**Response (200):**
```json
{
    "success": true,
    "data": {
        "overview": {
            "totalUsers": 15,
            "totalBookings": 45,
            "totalMatches": 20,
            "totalFlyers": 6,
            "totalGallery": 25,
            "pendingBookings": 5,
            "confirmedBookings": 38,
            "todayBookings": 2,
            "weekBookings": 8,
            "monthBookings": 15,
            "upcomingMatches": 4
        },
        "revenue": {
            "total": 4500000,
            "monthly": 750000
        },
        "recentBookings": [...],
        "bookingStats": [
            { "_id": "2026-04-01", "count": 3 },
            { "_id": "2026-04-02", "count": 5 }
        ],
        "bookingTypeStats": [
            { "_id": "match", "count": 30 },
            { "_id": "hourly", "count": 10 },
            { "_id": "tournament", "count": 5 }
        ]
    }
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Validation failed | Input validation error |
| 400 | Email already registered | Duplicate email |
| 400 | Booking type is required | Missing booking type |
| 401 | Not authorized | No token provided |
| 401 | Token invalid | Invalid JWT token |
| 401 | Token expired | JWT token expired |
| 403 | Access denied | Admin privileges required |
| 404 | Booking not found | Booking ID doesn't exist |
| 404 | Match not found | Match ID doesn't exist |
| 429 | Too many requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## Rate Limits

| Endpoint Type | Limit |
|---------------|-------|
| Public routes | 100 requests / 15 minutes |
| Auth routes | 10 requests / 15 minutes |
| Booking creation | 5 requests / hour |
| File uploads | 20 requests / hour |

---

## Example cURL Requests

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dfsportsarena.com","password":"Admin@123"}'
```

### Get Matches
```bash
curl http://localhost:5000/api/matches?upcoming=true
```

### Submit Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customerName":"John Doe",
    "customerPhone":"+256 776 123 456",
    "bookingType":"match",
    "preferredDate":"2026-04-20",
    "preferredTime":"3:00 PM",
    "duration":2,
    "numberOfPlayers":22
  }'
```

### Create Match (Admin)
```bash
curl -X POST http://localhost:5000/api/matches \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "teamA":"DF Arena FC",
    "teamB":"Opponent FC",
    "date":"2026-05-01",
    "time":"4:00 PM",
    "tournament":"Friendly Match"
  }'
```
