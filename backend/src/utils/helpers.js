const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const calculateDuration = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    return Math.round((endMinutes - startMinutes) / 60);
};

const paginate = (query, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return { skip, limit };
};

const responseFormat = (success, message, data = null) => {
    return {
        success,
        message,
        ...(data && { data })
    };
};

module.exports = {
    formatDate,
    formatTime,
    generateSlug,
    calculateDuration,
    paginate,
    responseFormat
};
