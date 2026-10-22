const API_URL = window.location.origin + '/api';

const flyersData = [
    {
        id: 1,
        title: "Natz Cup Grand Final",
        image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "April 15, 2026",
        time: "3:00 PM"
    },
    {
        id: 2,
        title: "Inter-Community Championship",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "April 22, 2026",
        time: "4:00 PM"
    },
    {
        id: 3,
        title: "Youth League Opening",
        image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "May 1, 2026",
        time: "2:00 PM"
    },
    {
        id: 4,
        title: "Natz Arena vs Rhino FC",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "May 8, 2026",
        time: "3:30 PM"
    },
    {
        id: 5,
        title: "Charity Match Day",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "May 15, 2026",
        time: "2:00 PM"
    },
    {
        id: 6,
        title: "Semi-Final Showdown",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        date: "May 22, 2026",
        time: "4:00 PM"
    }
];

const matchesData = [
    {
        id: 1,
        teamA: "Natz Arena FC",
        teamB: "Moyo United",
        date: "April 5, 2026",
        time: "3:00 PM",
        tournament: "Adjumani District League"
    },
    {
        id: 2,
        teamA: "Natz Arena FC",
        teamB: "Rhino FC",
        date: "April 12, 2026",
        time: "4:00 PM",
        tournament: "Natz Cup 2026"
    },
    {
        id: 3,
        teamA: "Natz Arena FC",
        teamB: "Nyapea Stars",
        date: "April 19, 2026",
        time: "3:30 PM",
        tournament: "Inter-Community Cup"
    },
    {
        id: 4,
        teamA: "Natz Arena FC",
        teamB: "Ciforo FC",
        date: "April 26, 2026",
        time: "2:00 PM",
        tournament: "Adjumani District League"
    }
];

const galleryImages = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Football match at Natz Arena"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Natz Cup celebration"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Football pitch view"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Youth training session"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Match action"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Stadium atmosphere"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Team celebration"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Goal celebration"
    }
];

async function fetchFromAPI(endpoint, fallback = null) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) throw new Error('API unavailable');
        const data = await response.json();
        return data.success ? data.data : fallback;
    } catch (error) {
        return fallback;
    }
}

async function loadFlyers() {
    const container = document.getElementById('flyers-container');
    if (!container) return;

    const apiData = await fetchFromAPI('/flyers/flyers');
    const data = apiData || flyersData;

    let html = '';
    data.forEach(flyer => {
        const image = flyer.imageUrl || flyer.image;
        const title = flyer.title;
        const date = flyer.formattedDate || flyer.date;
        const time = flyer.time;
        html += `
            <div class="col-lg-4 col-md-6">
                <div class="flyer-card" onclick="openImageModal('${image}', '${title}')">
                    <div class="overflow-hidden">
                        <img src="${image}" alt="${title}" class="img-fluid" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <div class="flyer-meta">
                            <span><i class="fas fa-calendar"></i> ${date}</span>
                            <span><i class="fas fa-clock"></i> ${time}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function loadMatches() {
    const container = document.getElementById('matches-container');
    if (!container) return;

    const apiData = await fetchFromAPI('/matches?upcoming=true');
    const data = apiData?.matches || matchesData;

    let html = '';
    data.forEach(match => {
        const teamA = match.teamA;
        const teamB = match.teamB;
        const date = match.formattedDate || match.date;
        const time = match.time;
        const tournament = match.tournament;
        html += `
            <div class="col-lg-6">
                <div class="match-card">
                    <div class="card-header">
                        <h4>${tournament}</h4>
                    </div>
                    <div class="card-body">
                        <span class="tournament-badge">Upcoming Match</span>
                        <div class="teams-display">
                            <span class="team-name">${teamA}</span>
                            <span class="vs-badge">VS</span>
                            <span class="team-name">${teamB}</span>
                        </div>
                        <div class="match-info">
                            <div class="match-info-item">
                                <i class="fas fa-calendar"></i>
                                <span>${date}</span>
                            </div>
                            <div class="match-info-item">
                                <i class="fas fa-clock"></i>
                                <span>${time}</span>
                            </div>
                        </div>
                        <a href="https://wa.me/256788980631?text=Hello%20Natz%20Sports%20Arena%20I%20would%20like%20to%20book%20the%20pitch%20for%20the%20match%20on%20${encodeURIComponent(date)}" class="btn btn-whatsapp btn-sm" target="_blank">
                            <i class="fab fa-whatsapp"></i> Book Tickets
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    const apiData = await fetchFromAPI('/gallery');
    const data = apiData?.images || galleryImages;

    let html = '';
    data.forEach(image => {
        const src = image.imageUrl || image.src;
        const alt = image.altText || image.alt;
        html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="gallery-item" onclick="openImageModal('${src}', '${alt}')">
                    <img src="${src}" alt="${alt}" class="img-fluid" loading="lazy">
                    <div class="overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function openImageModal(imageSrc, imageAlt) {
    const modalElement = document.getElementById('imageModal');
    if (!modalElement) return;
    
    const modal = new bootstrap.Modal(modalElement);
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');
    
    if (modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
    }
    if (modalTitle) {
        modalTitle.textContent = imageAlt || 'Image Preview';
    }
    modal.show();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigation() {
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navbarLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToTop();
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.match-card, .flyer-card, .gallery-item, .contact-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.match-card, .flyer-card, .gallery-item, .contact-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
}

document.addEventListener('DOMContentLoaded', function() {
    loadFlyers();
    loadMatches();
    loadGallery();
    initNavigation();
    initBackToTop();
    initScrollAnimations();

    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.removeAttribute('onclick');
    }
});


