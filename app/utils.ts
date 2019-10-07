// Converts a value to string or keeps it as a string
export function arrayfy<T>(raw: T | Array<T>): Array<T> {
    if (Array.isArray(raw)) return raw;
    else return [raw];
}

export function getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return day + "/" + month + "/" + year;
}
