const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        
        // Validate paymentId format
        if (!paymentId || typeof paymentId !== 'string' || paymentId.length < 10) {
            return res.status(400).json({ error: 'Invalid payment ID format' });
        }

        // Fetch payment details from Razorpay
        const payment = await razorpay.payments.fetch(paymentId);
        
        // Verify payment signature if provided in request
        if (req.body.razorpay_signature) {
            const generatedSignature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${paymentId}|${req.body.razorpay_order_id}`)
                .digest('hex');

            if (generatedSignature !== req.body.razorpay_signature) {
                return res.status(400).json({ error: 'Invalid payment signature' });
            }
        }

        // Validate payment status
        if (payment.status !== 'captured') {
            return res.status(400).json({ 
                error: 'Payment not completed',
                status: payment.status 
            });
        }

        // Map payment method to standardized format
        const methodMapping = {
            'card': 'credit_card',
            'netbanking': 'net_banking',
            'wallet': 'digital_wallet',
            'upi': 'upi',
            'emi': 'emi'
        };

        // Prepare sanitized payment details
        const paymentDetails = {
            method: methodMapping[payment.method] || payment.method,
            amount: payment.amount / 100, // Convert from paise to rupees
            status: payment.status,
            email: payment.email,
            contact: payment.contact,
            currency: payment.currency,
            created_at: new Date(payment.created_at * 1000).toISOString(),
            captured: payment.captured
        };

        // Add payment method specific details if available
        if (payment.card) {
            paymentDetails.card = {
                last4: payment.card.last4,
                network: payment.card.network,
                type: payment.card.type,
                issuer: payment.card.issuer
            };
        }

        // Log payment verification success (consider using proper logging service)
        console.log(`Payment verified successfully for ID: ${paymentId}`);
        
        res.json(paymentDetails);
    } catch (error) {
        console.error('Error verifying payment:', error);
        
        // Send appropriate error response based on error type
        if (error.statusCode === 400) {
            return res.status(400).json({ error: 'Invalid payment details' });
        } else if (error.statusCode === 401) {
            return res.status(401).json({ error: 'Unauthorized access to payment details' });
        }
        
        res.status(500).json({ error: 'Error verifying payment' });
    }
};

const validateWebhook = (req, res, next) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const webhookSignature = req.headers['x-razorpay-signature'];

    if (!webhookSignature) {
        return res.status(400).json({ error: 'Missing webhook signature' });
    }

    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== webhookSignature) {
        return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    next();
};

module.exports = {
    verifyPayment,
    validateWebhook
};