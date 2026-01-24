export function toBase64(value: string) {
    const buffer = Buffer.from(value, 'utf8');
    return buffer.toString('base64url');
}

export function fromBase64(value: string) {
    const buffer = Buffer.from(value, 'base64url');
    return buffer.toString('utf8');
}
