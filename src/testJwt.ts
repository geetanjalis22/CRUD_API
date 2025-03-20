import { generateToken, verifyToken } from './utils/jwt';

// Test Data
const testUserId = 'user123';

// Generate Token
const token = generateToken(testUserId);
console.log('Generated Token:', token);

// Verify Token
try {
    const decoded = verifyToken(token);
    console.log('Decoded Token:', decoded);
} catch (error) {
    if (error instanceof Error) {
        console.error('Invalid Token Error:', error.message);
    } else {
        console.error('Unknown error occurred:', error);
    }
}
