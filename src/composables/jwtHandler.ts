import crypto from 'crypto';

export function generateToken(payload: any): string {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };

    const encode = input => Buffer.from(
        JSON.stringify(input))
        .toString('base64')
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const encodedHeader = encode(header);
    const encodedPayload = encode(payload);

    const secret = 'your-secret-key';
    const signature = encode(
        crypto.createHmac('sha256', secret)
            .update(`${encodedHeader}.${encodedPayload}`))

    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function extractUserIdFromToken(token: string): number | null {
    if (!token) return null;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = parts[1];
        const decodedPayload = Buffer.from(
            payload
                .replace(/-/g, '+')
                .replace(/_/g, '/'),
            'base64'
        ).toString('utf-8');

        const parsedPayload = JSON.parse(decodedPayload);
        return parsedPayload.userId || null;
    } catch (error) {
        console.error('Error extracting userId from token:', error);
        return null;
    }
}
