const API_BASE_URL = 'http://localhost:5000/api';

const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            }
        };

        if (options.body && typeof options.body === 'object') {
            config.body = JSON.stringify(options.body);
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint);
    },

    post(endpoint, body) {
        return this.request(endpoint, { method: 'POST', body });
    },

    put(endpoint, body) {
        return this.request(endpoint, { method: 'PUT', body });
    },

    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
};

const apiService = {
    api,

    async getPublicBookingInfo() {
        return api.get('/bookings/public');
    },

    async checkAvailability(date) {
        return api.get(`/bookings/availability?date=${date}`);
    },

    async createBooking(bookingData) {
        return api.post('/bookings', bookingData);
    },

    async getMatches(upcoming = true) {
        return api.get(`/matches?upcoming=${upcoming}`);
    },

    async getFlyers() {
        return api.get('/flyers');
    },

    async getGallery() {
        return api.get('/gallery');
    },

    async getSettings() {
        return api.get('/settings/public');
    }
};

window.apiService = apiService;
