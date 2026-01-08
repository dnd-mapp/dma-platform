const encoder = new TextEncoder();

function encode(value: string) {
    return encoder.encode(value);
}

export async function sha256(data: string) {
    const hash = await crypto.subtle.digest('SHA-256', encode(data));

    return Array.from(new Uint8Array(hash))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join();
}
