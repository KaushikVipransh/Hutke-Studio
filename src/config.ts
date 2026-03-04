// In a real-world scenario, you might use Vercel's environment variables
// to distinguish between environments, e.g., process.env.VERCEL_ENV
const isProduction = process.env.NODE_ENV === 'production';

// Use a relative path for production so it works with Vercel's rewrites.
export const API_BASE_URL = isProduction ? '/api' : 'http://localhost:5000/api';