const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: `"Natz Sports Arena" <${process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false, error: error.message };
    }
};

const sendBookingConfirmation = async (booking) => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #006400; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Natz Sports Arena</h1>
                    <p>Booking Confirmation</p>
                </div>
                <div class="content">
                    <p>Hello <strong>${booking.customerName}</strong>,</p>
                    <p>Thank you for your booking request! Your booking is currently <strong>pending confirmation</strong>.</p>
                    
                    <div class="details">
                        <h3>Booking Details</h3>
                        <p><strong>Booking ID:</strong> ${booking._id}</p>
                        <p><strong>Date:</strong> ${booking.formattedDate || new Date(booking.preferredDate).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> ${booking.preferredTime}</p>
                        <p><strong>Duration:</strong> ${booking.duration} hour(s)</p>
                        <p><strong>Booking Type:</strong> ${booking.bookingType}</p>
                        <p><strong>Number of Players:</strong> ${booking.numberOfPlayers}</p>
                    </div>
                    
                    <p>We will review your booking and send you a confirmation within 24 hours.</p>
                    <p>If you have any questions, please contact us:</p>
                    <ul>
                        <li>Phone: ${process.env.ARENA_PHONE}</li>
                        <li>Email: ${process.env.ARENA_EMAIL}</li>
                    </ul>
                </div>
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Natz Sports Arena. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    return sendEmail({
        to: booking.customerEmail || process.env.ARENA_EMAIL,
        subject: `Booking Confirmation - Natz Sports Arena`,
        html
    });
};

const sendBookingStatusUpdate = async (booking) => {
    const statusMessages = {
        confirmed: 'Your booking has been confirmed!',
        cancelled: 'Your booking has been cancelled.',
        completed: 'Your booking has been marked as completed.'
    };

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #006400; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .status { padding: 15px; border-radius: 5px; margin: 15px 0; text-align: center; }
                .status.confirmed { background: #d4edda; color: #155724; }
                .status.cancelled { background: #f8d7da; color: #721c24; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Natz Sports Arena</h1>
                    <p>Booking Update</p>
                </div>
                <div class="content">
                    <p>Hello <strong>${booking.customerName}</strong>,</p>
                    <div class="status ${booking.status}">
                        <h2>${statusMessages[booking.status]}</h2>
                    </div>
                    <p><strong>Booking ID:</strong> ${booking._id}</p>
                    <p><strong>Date:</strong> ${booking.formattedDate || new Date(booking.preferredDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${booking.preferredTime}</p>
                </div>
            </div>
        </body>
        </html>
    `;

    return sendEmail({
        to: booking.customerEmail || process.env.ARENA_EMAIL,
        subject: `Booking ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} - Natz Sports Arena`,
        html
    });
};

module.exports = { sendEmail, sendBookingConfirmation, sendBookingStatusUpdate };
