const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { amount = 350, reference } = JSON.parse(event.body);

        // check environment variables
        if (!process.env.BEAM_SECRET_KEY || !process.env.BEAM_MERCHANT_ID) {
            console.error('Missing Beam credentials');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration error' }),
            };
        }

        // Call Beam API to create transaction
        // NOTE: Replace 'https://api.beamdata.co/v1/checkout' with the actual Beam API endpoint
        const beamResponse = await fetch('https://api.beamdata.co/v1/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.BEAM_SECRET_KEY}`,
            },
            body: JSON.stringify({
                merchantId: process.env.BEAM_MERCHANT_ID,
                amount: amount,
                currency: 'THB',
                reference: reference || `REF-${Date.now()}`,
                successUrl: `${process.env.URL}/payment-success`,
                cancelUrl: `${process.env.URL}/pay`,
            }),
        });

        const beamData = await beamResponse.json();

        if (!beamResponse.ok) {
            throw new Error(beamData.message || 'Failed to create beam transaction');
        }

        // Return the payment URL/Token to the frontend
        return {
            statusCode: 200,
            body: JSON.stringify({
                paymentUrl: beamData.paymentUrl, // Adjust based on actual API response
                token: beamData.token
            }),
        };

    } catch (error) {
        console.error('Beam function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to initiate payment' }),
        };
    }
};
