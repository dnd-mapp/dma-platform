export function toBase64(value: string) {
    const buffer = Buffer.from(value, 'utf8');
    return buffer.toString('base64url');
}
