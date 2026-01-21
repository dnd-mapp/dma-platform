export function base64(value: string, textEncoder: TextEncoder) {
    const bytes = textEncoder.encode(value);
    const binaryString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');

    return btoa(binaryString);

export async function sha256(value: string, textEncoder: TextEncoder) {
    const bytes = textEncoder.encode(value);
    return await crypto.subtle.digest('SHA-256', bytes);
}
