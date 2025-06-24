import crypto from 'crypto';

// Secret key for JWT signing - in a real application, this should be stored in environment variables
const JWT_SECRET = 'your-secret-key';

// JWT token expiration time in seconds (1 hour)
const JWT_EXPIRATION = 3600;

/**
 * Generate a JWT token containing the user ID
 * @param userId The user ID to include in the token
 * @returns The JWT token
 */
export function generateToken(userId: number): string {
  // Create the JWT header
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // Create the JWT payload
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + JWT_EXPIRATION
  };

  // Encode the header and payload
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  // Create the signature
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Return the JWT token
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify a JWT token and extract the user ID
 * @param token The JWT token to verify
 * @returns The user ID if the token is valid, null otherwise
 */
export function verifyToken(token: string): number | null {
  try {
    // Split the token into its parts
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    // Verify the signature
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    if (signature !== expectedSignature) {
      return null;
    }

    // Decode the payload
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());

    // Check if the token has expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    // Return the user ID
    return payload.sub;
  } catch (error) {
    return null;
  }
}

/**
 * Extract the user ID from a request
 * @param event The H3 event object
 * @returns The user ID if the token is valid, null otherwise
 */
export function getUserIdFromRequest(event: any): number | null {
  // Get the authorization header
  const authHeader = event.node.req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  // Extract the token
  const token = authHeader.substring(7);
  
  // Verify the token and return the user ID
  return verifyToken(token);
}