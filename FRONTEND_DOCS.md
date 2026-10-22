# Natz Sports Arena - Frontend Documentation

## Overview

Natz Sports Arena is a static website for a football arena located in Adjumani, Uganda. The frontend is built with HTML5, CSS3, and vanilla JavaScript, using Bootstrap 5 as the UI framework.

## Project Structure

```
D:\DF SPORTS ARENA\
├── index.html          # Homepage
├── matches.html         # Upcoming matches page
├── flyers.html          # Event flyers page
├── gallery.html         # Photo gallery page
├── booking.html         # Pitch booking page
├── contact.html         # Contact information page
├── css/
│   └── style.css        # Custom styles (886 lines)
├── js/
│   └── script.js        # JavaScript functionality (296 lines)
├── images/              # Local images directory
└── README.md
```

## Pages

### 1. Homepage (index.html)
- **Hero Section**: Full-screen landing with animated background, tagline, and CTA buttons
- **Upcoming Matches**: Displays 4 upcoming matches with booking links
- **Book Pitch CTA**: Prominent booking section
- **Google Maps**: Embedded location map for Adjumani, Uganda
- **Footer**: Navigation links and social media icons

### 2. Matches Page (matches.html)
- Page header with breadcrumb-style title
- Dynamic match cards rendered from `matchesData`
- Booking CTA section
- Footer with navigation

### 3. Flyers Page (flyers.html)
- Grid layout of event flyers
- Dynamic rendering from `flyersData`
- Click-to-open modal for full-size image preview
- Contact CTA section

### 4. Gallery Page (gallery.html)
- Responsive photo grid (3 columns desktop, 4 columns tablet, 6 columns mobile)
- Hover overlay effect with zoom icon
- Click-to-open modal for full-size image preview
- Social media CTA section

### 5. Booking Page (booking.html)
- WhatsApp booking integration
- Booking checklist (what to include in request)
- Contact cards (Phone, Email, Location)
- Pricing tiers display (Hourly, Match, Tournament)
- Multiple CTAs throughout

### 6. Contact Page (contact.html)
- 6 contact cards: Location, Phone, WhatsApp, Email, Hours, Booking
- Google Maps embed
- Social media links
- Booking CTA

## Components

### Navigation Bar
- Fixed top position
- Responsive hamburger menu for mobile
- Active state highlighting for current page
- Hover underline animation (gold accent)

### Match Card
- Tournament header (green gradient)
- "Upcoming Match" badge
- Team names with VS badge
- Date/time display
- WhatsApp booking button

### Flyer Card
- Image with overflow hidden for zoom effect
- Card body with title and metadata
- Click to open modal

### Gallery Item
- Fixed aspect ratio images
- Hover overlay with search icon
- Click to open modal

### Contact Card
- Circular icon header
- Centered content
- Hover lift effect

### Footer
- Logo and tagline
- Navigation links
- Social media icons (Facebook, Instagram, WhatsApp)
- Copyright notice

### Back to Top Button
- Fixed bottom-right position
- Appears after 300px scroll
- Smooth scroll animation

### Image Modal
- Bootstrap 5 modal
- Full-size image display
- Dynamic title from clicked element

## JavaScript Functions

### Data Arrays
```javascript
flyersData    // Array of 6 event flyer objects
matchesData   // Array of 4 upcoming match objects
galleryImages // Array of 8 gallery image objects
```

### Core Functions
| Function | Description |
|----------|-------------|
| `loadFlyers()` | Renders flyer cards to `#flyers-container` |
| `loadMatches()` | Renders match cards to `#matches-container` |
| `loadGallery()` | Renders gallery items to `#gallery-container` |
| `openImageModal(src, alt)` | Opens Bootstrap modal with image |
| `scrollToTop()` | Smooth scrolls to page top |
| `initNavigation()` | Sets active nav link based on current page |
| `initBackToTop()` | Controls back-to-top button visibility |
| `initScrollAnimations()` | Fade-in animation on scroll |

### Initialization
All functions are called on `DOMContentLoaded` event.

## CSS Architecture

### Color Variables (CSS Custom Properties)
```css
--primary-green: #006400    /* Main brand color */
--dark-green: #004d00       /* Darker variant */
--light-green: #228b22     /* Lighter variant */
--accent-gold: #ffd700     /* Highlight/CTA color */
--black: #000000
--white: #ffffff
--gray: #6c757d
--light-gray: #f8f9fa
```

### Key Styles
- **Buttons**: Gradient backgrounds, hover lift effects, rounded corners
- **Cards**: Shadow effects, border-radius, hover transforms
- **Hero**: Fixed background attachment, gradient overlay, animated content
- **Animations**: fadeInUp, pulse, bounce, moveBackground
- **Responsive**: Mobile-first breakpoints at 576px and 768px

### WhatsApp Integration
- Phone: `+256 776 057 501`
- URL Format: `https://wa.me/256788980631?text=<encoded_message>`
- Pre-filled messages for different contexts (booking, tickets, inquiries)

## External Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| Bootstrap | 5.3.0 | Grid, components, modal |
| Font Awesome | 6.4.0 | Icons (football, calendar, WhatsApp, etc.) |
| Google Fonts | N/A | System fonts (Segoe UI) |

## External Resources

| Service | Purpose |
|---------|---------|
| Unsplash | Stock images for heroes, flyers, gallery |
| Google Maps | Location embed |
| WhatsApp API | Direct messaging |

## Responsive Breakpoints

| Breakpoint | Column Layout |
|------------|---------------|
| Desktop (lg) | 4 columns (flyers), 6 columns (matches), 3 columns (gallery) |
| Tablet (md) | 6 columns (flyers), 4 columns (gallery) |
| Mobile | 1 column, stacked layouts, hamburger menu |

## Features

1. **Dynamic Content Loading**: All cards render from JavaScript data arrays
2. **Image Modal Preview**: Click any flyer or gallery image to view full-size
3. **Scroll Animations**: Elements fade in as they enter viewport
4. **Active Navigation**: Current page highlighted in nav
5. **Back to Top**: Appears on scroll, smooth scroll back
6. **WhatsApp Booking**: One-click booking via WhatsApp with pre-filled messages
7. **Responsive Design**: Mobile-first approach with Bootstrap grid
8. **SEO Meta Tags**: Each page has unique title and description

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Bootstrap 5 does not support IE11

## Performance Notes

- External CDN for all libraries (Bootstrap, Font Awesome)
- Lazy loading on Google Maps iframe
- CSS animations use transform/opacity for GPU acceleration
- Minimal JavaScript footprint (vanilla JS, no frameworks)
