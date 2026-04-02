const Settings = require('../models/Settings');

exports.getSettings = async (req, res, next) => {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                arenaName: 'DF Sports Arena'
            });
        }

        res.json({
            success: true,
            data: { settings }
        });
    } catch (error) {
        next(error);
    }
};

exports.updateSettings = async (req, res, next) => {
    try {
        const updates = req.body;

        const forbiddenFields = ['_id', 'createdAt', 'updatedAt'];
        forbiddenFields.forEach(field => delete updates[field]);

        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create(updates);
        } else {
            Object.keys(updates).forEach(key => {
                if (typeof updates[key] === 'object' && updates[key] !== null) {
                    settings[key] = { ...settings[key], ...updates[key] };
                } else {
                    settings[key] = updates[key];
                }
            });
            await settings.save();
        }

        res.json({
            success: true,
            message: 'Settings updated successfully',
            data: { settings }
        });
    } catch (error) {
        next(error);
    }
};

exports.getPublicSettings = async (req, res, next) => {
    try {
        const settings = await Settings.findOne();

        if (!settings) {
            return res.json({
                success: true,
                data: {
                    settings: {
                        arenaName: 'DF Sports Arena',
                        phone: '+256 776 057 501',
                        whatsapp: '256776057501',
                        email: 'info@dfsportsarena.com',
                        address: {
                            street: 'Adjumani Town',
                            district: 'Adjumani District',
                            country: 'Uganda'
                        },
                        operatingHours: {
                            open: '06:00',
                            close: '22:00'
                        },
                        socialLinks: {}
                    }
                }
            });
        }

        res.json({
            success: true,
            data: {
                settings: {
                    arenaName: settings.arenaName,
                    tagline: settings.tagline,
                    phone: settings.phone,
                    whatsapp: settings.whatsapp,
                    email: settings.email,
                    address: settings.address,
                    mapEmbedUrl: settings.mapEmbedUrl,
                    operatingHours: settings.operatingHours,
                    socialLinks: settings.socialLinks
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
