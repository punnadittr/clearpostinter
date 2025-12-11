const { handler } = require('./netlify/functions/create-beam-transaction');

// Mock environment variables
process.env.BEAM_SECRET_KEY = 'test_secret';
process.env.BEAM_MERCHANT_ID = 'test_merchant';
process.env.URL = 'http://localhost:3000';

async function testFunction() {
    console.log('--- Testing Beam Transaction Function ---');

    const mockEvent = {
        httpMethod: 'POST',
        body: JSON.stringify({ amount: 1000 })
    };

    const mockContext = {};

    try {
        // We expect this to fail the actual Fetch call because credentials are fake
        // But we want to see it reach that point, or return the 405 if method is wrong

        // Test 1: Wrong Method
        console.log('\nTest 1: GET Request (Should be 405)');
        const res1 = await handler({ httpMethod: 'GET' }, mockContext);
        console.log('Status:', res1.statusCode); // Expected 405

        // Test 2: Valid POST (Mock Fetch/Auth Fail)
        console.log('\nTest 2: POST Request (Valid Body)');
        // Note: The function uses 'node-fetch'. If installed via npm install, it should work.
        // The real fetch will likely fail or return 401 from Beam API because keys are fake.
        // We'll catch that error.
        const res2 = await handler(mockEvent, mockContext);
        console.log('Result:', res2);

    } catch (e) {
        console.error('Test script error:', e);
    }
}

testFunction();
