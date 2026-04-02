const API_URL = 'http://localhost:5000/api';

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
        month: 'long',
        day: 'numeric'
    });
}

async function loadMatchesFromAPI() {
    try {
        const response = await fetch(`${API_URL}/matches?upcoming=true`);
        const data = await response.json();
        
        if (data.success && data.data.matches) {
            return data.data.matches;
        }
    } catch (error) {
        console.log('Using static data for matches');
    }
    return null;
}

async function loadFlyersFromAPI() {
    try {
        const response = await fetch(`${API_URL}/flyers`);
        const data = await response.json();
        
        if (data.success && data.data.flyers) {
            return data.data.flyers;
        }
    } catch (error) {
        console.log('Using static data for flyers');
    }
    return null;
}

async function loadGalleryFromAPI() {
    try {
        const response = await fetch(`${API_URL}/gallery`);
        const data = await response.json();
        
        if (data.success && data.data.images) {
            return data.data.images;
        }
    } catch (error) {
        console.log('Using static data for gallery');
    }
    return null;
}

async function submitBooking(formData) {
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to submit booking');
    }
}

async function getBookingInfo() {
    try {
        const response = await fetch(`${API_URL}/bookings/public`);
        return await response.json();
    } catch (error) {
        return { success: true, data: { pricing: [] } };
    }
}

window.apiFunctions = {
    formatCurrency,
    formatDate,
    loadMatchesFromAPI,
    loadFlyersFromAPI,
    loadGalleryFromAPI,
    submitBooking,
    getBookingInfo
};
