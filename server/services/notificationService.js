const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

class NotificationService {
    static #twilioClient = null;
    static #emailTransporter = null;

    /**
     * Initialize the notification service and validate all required configurations
     * @throws {Error} If required environment variables are missing or invalid
     */
    static initialize() {
        // Validate required environment variables
        const requiredEnvVars = {
            TWILIO_ACCOUNT_SID: 'Twilio Account SID',
            TWILIO_AUTH_TOKEN: 'Twilio Auth Token',
            TWILIO_PHONE_NUMBER: 'Twilio Phone Number',
            TWILIO_WHATSAPP_NUMBER: 'Twilio WhatsApp Number',
            EMAIL_USER: 'Email Username',
            EMAIL_PASSWORD: 'Email Password'
        };

        const missingVars = Object.entries(requiredEnvVars)
            .filter(([key]) => !process.env[key])
            .map(([, label]) => label);

        if (missingVars.length > 0) {
            throw new Error(`Missing required configuration: ${missingVars.join(', ')}`);
        }

        // Initialize Twilio client
        try {
            this.#twilioClient = new twilio(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN
            );
        } catch (error) {
            throw new Error(`Failed to initialize Twilio client: ${error.message}`);
        }

        // Initialize email transporter
        try {
            this.#emailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
        } catch (error) {
            throw new Error(`Failed to initialize email transporter: ${error.message}`);
        }
    }

    /**
     * Get the Twilio client instance
     * @returns {Object} Twilio client
     */
    static get twilioClient() {
        if (!this.#twilioClient) {
            this.initialize();
        }
        return this.#twilioClient;
    }

    /**
     * Get the email transporter instance
     * @returns {Object} Nodemailer transporter
     */
    static get emailTransporter() {
        if (!this.#emailTransporter) {
            this.initialize();
        }
        return this.#emailTransporter;
    }

    /**
     * Format phone number to international format
     * @param {string} phoneNumber - Phone number to format
     * @returns {string} Formatted phone number
     */
    static formatPhoneNumber(phoneNumber) {
        // Remove any non-digit characters
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        // Add India country code if not present
        if (!cleaned.startsWith('91')) {
            return `+91${cleaned}`;
        }
        console.log(this.formatPhoneNumber);
        // Add + if missing
        return cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
    }

    /**
     * Validate phone number format
     * @param {string} phoneNumber - Phone number to validate
     * @returns {boolean} Whether phone number is valid
     */
    static validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+?91[1-9]\d{9}$/;
        return phoneRegex.test(phoneNumber);
    }

    /**
     * Verify Twilio credentials
     * @returns {Promise<boolean>} Whether credentials are valid
     */
    static async verifyTwilioCredentials() {
        try {
            const account = await this.twilioClient.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
            console.log('Twilio credentials verified:', {
                friendlyName: account.friendlyName,
                status: account.status
            });
            return true;
        } catch (error) {
            console.error('Twilio credential verification failed:', {
                status: error.status,
                code: error.code,
                message: error.message
            });
            return false;
        }
    }

    /**
     * Send email notification
     * @param {Object} booking - Booking details
     * @param {Object} payment - Payment details
     * @returns {Promise<Object>} Result of email sending operation
     */
    static async sendEmail(booking, payment) {
        if (!booking.email) {
            return {
                success: false,
                channel: 'email',
                error: 'Email address not provided'
            };
        }

        const emailTemplate = `
            <h1>Booking Confirmation - Urban Oasis</h1>
            <p>Dear ${booking.first_name} ${booking.last_name},</p>
            <p>Your booking has been confirmed and payment has been received successfully.</p>
            
            <h2>Booking Details:</h2>
            <ul>
                <li>Booking ID: ${booking.booking_id}</li>
                <li>Room Type: ${booking.room_type}</li>
                <li>Room Number: ${booking.room_number}</li>
                <li>Check-in Date: ${new Date(booking.check_in_date).toLocaleDateString()}</li>
                <li>Check-out Date: ${new Date(booking.check_out_date).toLocaleDateString()}</li>
            </ul>

            <h2>Payment Details:</h2>
            <ul>
                <li>Amount Paid: ₹${payment.amount}</li>
                <li>Payment ID: ${payment.paymentId}</li>
                <li>Payment Method: ${payment.paymentMethod}</li>
            </ul>

            <p>Thank you for choosing Urban Oasis. We look forward to hosting you!</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>Urban Oasis Team</p>
        `;

        const mailOptions = {
            from: {
                name: 'Urban Oasis',
                address: process.env.EMAIL_USER
            },
            to: booking.email,
            subject: 'Booking Confirmation - Urban Oasis',
            html: emailTemplate
        };

        try {
            const info = await this.emailTransporter.sendMail(mailOptions);
            console.log('Email sent successfully:', {
                messageId: info.messageId,
                to: booking.email
            });
            
            return {
                success: true,
                channel: 'email',
                messageId: info.messageId
            };
        } catch (error) {
            console.error('Error sending email:', error);
            return { 
                success: false, 
                channel: 'email',
                error: error.message,
                errorCode: error.code
            };
        }
    }

    /**
     * Send SMS notification
     * @param {Object} booking - Booking details
     * @param {Object} payment - Payment details
     * @returns {Promise<Object>} Result of SMS sending operation
     */
    static async sendSMS(booking, payment) {
        try {
            const formattedPhone = this.formatPhoneNumber(booking.phone_number);
            
            if (!this.validatePhoneNumber(formattedPhone)) {
                throw new Error(`Invalid phone number format: ${formattedPhone}`);
            }

            // Verify credentials before sending
            if (!await this.verifyTwilioCredentials()) {
                throw new Error('Failed to verify Twilio credentials');
            }

            const message = `
                Booking Confirmed! Urban Oasis
                Booking ID: ${booking.booking_id}
                Room: ${booking.room_type} (${booking.room_number})
                Check-in: ${new Date(booking.check_in_date).toLocaleDateString()}
                Amount Paid: ₹${payment.amount}
                Thank you for choosing Urban Oasis!
            `.trim();

            const result = await this.twilioClient.messages.create({
                body: message,
                to: formattedPhone,
                from: process.env.TWILIO_PHONE_NUMBER
            });

            console.log('SMS sent successfully:', {
                sid: result.sid,
                status: result.status,
                to: formattedPhone
            });
            
            return {
                success: true,
                channel: 'sms',
                messageId: result.sid
            };
        } catch (error) {
            console.error('Error sending SMS:', {
                status: error.status,
                code: error.code,
                message: error.message
            });
            
            return { 
                success: false, 
                channel: 'sms',
                error: error.message,
                errorCode: error.code
            };
        }
    }

    /**
     * Send WhatsApp notification
     * @param {Object} booking - Booking details
     * @param {Object} payment - Payment details
     * @returns {Promise<Object>} Result of WhatsApp sending operation
     */
    static async sendWhatsApp(booking, payment) {
        try {
            const formattedPhone = this.formatPhoneNumber(booking.phone_number);
            
            if (!this.validatePhoneNumber(formattedPhone)) {
                throw new Error(`Invalid phone number format: ${formattedPhone}`);
            }

            // Verify credentials before sending
            if (!await this.verifyTwilioCredentials()) {
                throw new Error('Failed to verify Twilio credentials');
            }

            if (!process.env.TWILIO_WHATSAPP_NUMBER) {
                throw new Error('WhatsApp sender number not configured');
            }

            const message = `
                *Booking Confirmed! Urban Oasis* 🏨

                Dear ${booking.first_name},
                Your booking has been confirmed!

                *Booking Details:*
                Booking ID: ${booking.booking_id}
                Room Type: ${booking.room_type}
                Room Number: ${booking.room_number}
                Check-in: ${new Date(booking.check_in_date).toLocaleDateString()}
                Check-out: ${new Date(booking.check_out_date).toLocaleDateString()}

                *Payment Details:*
                Amount Paid: ₹${payment.amount}
                Payment ID: ${payment.paymentId}

                Thank you for choosing Urban Oasis! 🙏
                For any assistance, please contact us at +91 9554112334.
            `.trim();

            const result = await this.twilioClient.messages.create({
                body: message,
                to: `whatsapp:${formattedPhone}`,
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
            });

            console.log('WhatsApp message sent successfully:', {
                sid: result.sid,
                status: result.status,
                to: formattedPhone
            });
            
            return {
                success: true,
                channel: 'whatsapp',
                messageId: result.sid
            };
        } catch (error) {
            console.error('Error sending WhatsApp message:', {
                status: error.status,
                code: error.code,
                message: error.message
            });
            
            return { 
                success: false, 
                channel: 'whatsapp',
                error: error.message,
                errorCode: error.code
            };
        }
    }

    /**
     * Send notifications through all available channels
     * @param {Object} booking - Booking details
     * @param {Object} payment - Payment details
     * @returns {Promise<Object>} Results of all notification attempts
     */
    static async sendAllNotifications(booking, payment) {
        const results = await Promise.all([
            this.sendEmail(booking, payment),
            this.sendSMS(booking, payment),
            this.sendWhatsApp(booking, payment)
        ]);

        const successCount = results.filter(result => result.success).length;
        const failures = results.filter(result => !result.success);

        if (failures.length > 0) {
            console.error(`Some notifications failed for booking ${booking.booking_id}:`, 
                failures.map(f => `${f.channel}: ${f.error}`).join(', ')
            );
        }

        return {
            success: successCount > 0,  // Consider partial success if at least one notification sent
            results,
            failureCount: failures.length,
            successCount,
            allChannelsSucceeded: failures.length === 0
        };
    }

    /**
     * Validate booking data
     * @param {Object} booking - Booking details to validate
     * @returns {boolean} Whether booking data is valid
     */
    static validateBookingData(booking) {
        const requiredFields = [
            'booking_id',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'room_type',
            'room_number',
            'check_in_date',
            'check_out_date'
        ];

        const missingFields = requiredFields.filter(field => !booking[field]);
        
        if (missingFields.length > 0) {
            console.error('Missing required booking fields:', missingFields);
            return false;
        }

        // Validate dates
        const checkIn = new Date(booking.check_in_date);
        const checkOut = new Date(booking.check_out_date);
        
        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            console.error('Invalid date format in booking data');
            return false;
        }

        if (checkOut <= checkIn) {
            console.error('Check-out date must be after check-in date');
            return false;
        }

        return true;
    }
}

module.exports = NotificationService;