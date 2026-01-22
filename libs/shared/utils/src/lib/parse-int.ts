export function parseInt(fallback: number, value?: string) {
    if (!value) return fallback;
    const parsed = Number.parseInt(value);

    if (Number.isNaN(parsed)) return fallback;
    return parsed;
}
