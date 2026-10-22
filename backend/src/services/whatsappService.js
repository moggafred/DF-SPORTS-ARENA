const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsAppMessage = async (to, message) => {
    try {
        const result = await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
            to: `whatsapp:${to}`,
            body: message
        });
        console.log('WhatsApp message sent:', result.sid);
        return { success: true, sid: result.sid };
    } catch (error) {
        console.error('WhatsApp error:', error);
        return { success: false, error: error.message };
    }
};

const sendBookingNotification = async (booking) => {
    const message = `
*New Booking Request - Natz Sports Arena*

*Customer:* ${booking.customerName}
*Phone:* ${booking.customerPhone}
*Email:* ${booking.customerEmail || 'N/A'}

*Booking Details:*
*Type:* ${booking.bookingType.toUpperCase()}
*Date:* ${booking.formattedDate || new Date(booking.preferredDate).toLocaleDateString()}
*Time:* ${booking.preferredTime}
*Duration:* ${booking.duration} hour(s)
*Players:* ${booking.numberOfPlayers}
${booking.teamName ? `*Team:* ${booking.teamName}` : ''}
${booking.opponentTeam ? `*Opponent:* ${booking.opponentTeam}` : ''}
${booking.notes ? `*Notes:* ${booking.notes}` : ''}

*Booking ID:* ${booking._id}
*Status:* Pending Review
    `.trim();

    return sendWhatsAppMessage(
        `+${process.env.ARENA_WHATSAPP}`,
        message
    );
};

const sendBookingConfirmation = async (booking) => {
    const statusIcon = booking.status === 'confirmed' ? '✅' : '❌';
    const message = `
${statusIcon} *Booking ${booking.status.toUpperCase()}*

Dear ${booking.customerName},

Your booking has been ${booking.status}.

*Details:*
*Date:* ${booking.formattedDate || new Date(booking.preferredDate).toLocaleDateString()}
*Time:* ${booking.preferredTime}
*Type:* ${booking.bookingType}

${booking.status === 'confirmed' ? 'See you at the arena!' : 'Contact us if you have questions.'}

Natz Sports Arena
    `.trim();

    return sendWhatsAppMessage(
        booking.customerPhone.startsWith('0') 
            ? `+256${booking.customerPhone.slice(1)}` 
            : booking.customerPhone,
        message
    );
};

module.exports = { sendWhatsAppMessage, sendBookingNotification, sendBookingConfirmation };
