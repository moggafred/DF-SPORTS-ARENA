const { body, param, query } = require('express-validator');

const authValidators = {
    register: [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('phone')
            .optional()
            .trim()
    ],
    login: [
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .notEmpty().withMessage('Password is required')
    ],
    updateProfile: [
        body('name')
            .optional()
            .trim()
            .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
        body('phone')
            .optional()
            .trim()
    ]
};

const bookingValidators = {
    create: [
        body('customerName')
            .trim()
            .notEmpty().withMessage('Customer name is required')
            .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
        body('customerPhone')
            .trim()
            .notEmpty().withMessage('Phone number is required'),
        body('customerEmail')
            .optional()
            .trim()
            .isEmail().withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('bookingType')
            .notEmpty().withMessage('Booking type is required')
            .isIn(['hourly', 'match', 'tournament']).withMessage('Invalid booking type'),
        body('preferredDate')
            .notEmpty().withMessage('Preferred date is required')
            .isISO8601().withMessage('Invalid date format')
            .custom((value) => {
                const date = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (date < today) {
                    throw new Error('Cannot book for past dates');
                }
                return true;
            }),
        body('preferredTime')
            .notEmpty().withMessage('Preferred time is required'),
        body('duration')
            .notEmpty().withMessage('Duration is required')
            .isInt({ min: 1 }).withMessage('Duration must be at least 1 hour'),
        body('numberOfPlayers')
            .notEmpty().withMessage('Number of players is required')
            .isInt({ min: 1 }).withMessage('Must have at least 1 player'),
        body('eventType')
            .optional()
            .trim(),
        body('teamName')
            .optional()
            .trim(),
        body('opponentTeam')
            .optional()
            .trim(),
        body('notes')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
    ],
    update: [
        body('status')
            .optional()
            .isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status'),
        body('totalPrice')
            .optional()
            .isNumeric().withMessage('Price must be a number'),
        body('adminNotes')
            .optional()
            .trim()
    ]
};

const matchValidators = {
    create: [
        body('teamA')
            .trim()
            .notEmpty().withMessage('Team A name is required'),
        body('teamB')
            .trim()
            .notEmpty().withMessage('Team B name is required'),
        body('date')
            .notEmpty().withMessage('Match date is required')
            .isISO8601().withMessage('Invalid date format'),
        body('time')
            .notEmpty().withMessage('Match time is required'),
        body('tournament')
            .trim()
            .notEmpty().withMessage('Tournament name is required')
    ],
    update: [
        body('status')
            .optional()
            .isIn(['upcoming', 'live', 'completed', 'cancelled']).withMessage('Invalid status'),
        body('scoreA')
            .optional()
            .isInt({ min: 0 }).withMessage('Score must be a positive number'),
        body('scoreB')
            .optional()
            .isInt({ min: 0 }).withMessage('Score must be a positive number')
    ]
};

const flyerValidators = {
    create: [
        body('title')
            .trim()
            .notEmpty().withMessage('Title is required')
            .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
        body('imageUrl')
            .optional()
            .trim(),
        body('date')
            .notEmpty().withMessage('Event date is required')
            .isISO8601().withMessage('Invalid date format'),
        body('time')
            .notEmpty().withMessage('Event time is required'),
        body('description')
            .optional()
            .trim()
            .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
    ]
};

const galleryValidators = {
    create: [
        body('altText')
            .trim()
            .notEmpty().withMessage('Alt text is required')
            .isLength({ max: 100 }).withMessage('Alt text cannot exceed 100 characters'),
        body('category')
            .optional()
            .isIn(['matches', 'training', 'events', 'facilities', 'general']).withMessage('Invalid category')
    ]
};

const pricingValidators = {
    update: [
        body('price')
            .optional()
            .isNumeric().withMessage('Price must be a number')
            .custom(v => v >= 0).withMessage('Price cannot be negative'),
        body('name')
            .optional()
            .trim(),
        body('description')
            .optional()
            .trim()
    ]
};

const idValidator = [
    param('id')
        .isMongoId().withMessage('Invalid ID format')
];

const paginationValidator = [
    query('page')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
];

module.exports = {
    authValidators,
    bookingValidators,
    matchValidators,
    flyerValidators,
    galleryValidators,
    pricingValidators,
    idValidator,
    paginationValidator
};
