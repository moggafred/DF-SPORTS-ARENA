const API_URL = 'http://localhost:5000/api';

let currentUser = null;
let token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'login.html';
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

async function apiCall(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: getHeaders()
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            }
            throw new Error(data.message || 'Request failed');
        }
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

function showAlert(message, type = 'success') {
    const container = document.getElementById('alertContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    setTimeout(() => {
        const alert = container.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-UG', {
        style: 'currency',
        currency: 'UGX',
        minimumFractionDigits: 0
    }).format(amount || 0);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusBadge(status) {
    const badges = {
        pending: '<span class="badge badge-pending">Pending</span>',
        confirmed: '<span class="badge badge-confirmed">Confirmed</span>',
        cancelled: '<span class="badge badge-cancelled">Cancelled</span>',
        completed: '<span class="badge bg-secondary">Completed</span>'
    };
    return badges[status] || `<span class="badge bg-secondary">${status}</span>`;
}

function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

document.addEventListener('DOMContentLoaded', () => {
    currentUser = getUser();
    if (currentUser) {
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = currentUser.name || 'Admin';
        }
    }

    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtn2 = document.getElementById('logoutBtn2');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (logoutBtn2) logoutBtn2.addEventListener('click', logout);

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

async function loadDashboardStats() {
    try {
        const data = await apiCall('/admin/dashboard');
        const stats = data.data;

        document.getElementById('totalBookings').textContent = stats.overview.totalBookings;
        document.getElementById('pendingBookings').textContent = stats.overview.pendingBookings;
        document.getElementById('totalRevenue').textContent = formatCurrency(stats.revenue.total).replace('UGX', '');
        document.getElementById('upcomingMatches').textContent = stats.overview.upcomingMatches;
        document.getElementById('todayBookings').textContent = stats.overview.todayBookings;
        document.getElementById('weekBookings').textContent = stats.overview.weekBookings;
        document.getElementById('monthBookings').textContent = stats.overview.totalBookings;
        document.getElementById('confirmedBookings').textContent = stats.overview.confirmedBookings;

        const tbody = document.getElementById('recentBookings');
        if (tbody && stats.recentBookings.length > 0) {
            tbody.innerHTML = stats.recentBookings.map(booking => `
                <tr>
                    <td>
                        <strong>${booking.customerName}</strong><br>
                        <small class="text-muted">${booking.customerPhone}</small>
                    </td>
                    <td>${booking.bookingType}</td>
                    <td>${formatDate(booking.preferredDate)}</td>
                    <td>${getStatusBadge(booking.status)}</td>
                </tr>
            `).join('');
        } else if (tbody) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4">No bookings found</td></tr>';
        }
    } catch (error) {
        showAlert('Failed to load dashboard data', 'danger');
    }
}

async function loadBookings(status = '', page = 1) {
    try {
        let endpoint = `/bookings?page=${page}&limit=10`;
        if (status) endpoint += `&status=${status}`;
        
        const data = await apiCall(endpoint);
        return data.data;
    } catch (error) {
        showAlert('Failed to load bookings', 'danger');
        return { bookings: [], pagination: { page: 1, pages: 1, total: 0 } };
    }
}

async function loadMatches() {
    try {
        const data = await apiCall('/matches?limit=50');
        return data.data.matches;
    } catch (error) {
        showAlert('Failed to load matches', 'danger');
        return [];
    }
}

async function loadFlyers() {
    try {
        const data = await apiCall('/flyers?limit=50');
        return data.data.flyers;
    } catch (error) {
        showAlert('Failed to load flyers', 'danger');
        return [];
    }
}

async function loadGallery() {
    try {
        const data = await apiCall('/gallery?limit=50');
        return data.data.images;
    } catch (error) {
        showAlert('Failed to load gallery', 'danger');
        return [];
    }
}

async function loadPricing() {
    try {
        const data = await apiCall('/pricing');
        return data.data.pricing;
    } catch (error) {
        showAlert('Failed to load pricing', 'danger');
        return [];
    }
}

async function loadSettings() {
    try {
        const data = await apiCall('/settings');
        return data.data.settings;
    } catch (error) {
        showAlert('Failed to load settings', 'danger');
        return null;
    }
}

window.apiCall = apiCall;
window.showAlert = showAlert;
window.logout = logout;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.getStatusBadge = getStatusBadge;
window.loadDashboardStats = loadDashboardStats;
window.loadBookings = loadBookings;
window.loadMatches = loadMatches;
window.loadFlyers = loadFlyers;
window.loadGallery = loadGallery;
window.loadPricing = loadPricing;
window.loadSettings = loadSettings;
