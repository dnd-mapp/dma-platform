export function base64(value: Uint8Array<ArrayBuffer>): string;
export function base64(value: string, textEncoder: TextEncoder): string;
export function base64(value: string | Uint8Array<ArrayBuffer>, textEncoder?: TextEncoder) {
    let byteArray: Uint8Array<ArrayBuffer>;

    if (typeof value === 'string') {
        if (textEncoder === undefined) {
            throw new Error(`A TextEncoder must be provided when "value" is a "string".`);
        }
        byteArray = textEncoder.encode(value);
    } else {
        byteArray = value;
    }
    const binaryString = Array.from(byteArray, (byte) => String.fromCharCode(byte)).join('');

    return btoa(binaryString).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

export async function sha256(value: string, textEncoder: TextEncoder) {
    const bytes = textEncoder.encode(value);
    return await crypto.subtle.digest('SHA-256', bytes);
}
