export function parseInt(value: string | undefined, fallback: number) {
    if (value === undefined) return fallback;
    const parsed = Number.parseInt(value);

    if (Number.isNaN(parsed)) return fallback;
    return parsed;
}
