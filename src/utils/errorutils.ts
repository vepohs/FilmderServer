export function ensureExists<T>(value: T | null | undefined, error: Error): T {
    if (!value) throw error;
    return value;
}



