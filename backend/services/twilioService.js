require('dotenv').config();
const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMSNotification = async (offenderPhone, message) => {
    try {
        const sms = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: offenderPhone
        });
        console.log(`SMS sent successfully: ${sms.sid}`);
    } catch (error) {
        console.error(`Failed to send SMS: ${error.message}`);
    }
};

module.exports = { sendSMSNotification };
