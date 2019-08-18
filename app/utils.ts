// Converts a value to string or keeps it as a string
export function arrayfy<T>(raw: T | Array<T>): Array<T> {
    if (Array.isArray(raw)) return raw;
    else return [raw];
}
