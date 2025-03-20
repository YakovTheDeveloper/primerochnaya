export function isEmpty(data: any[] | Record<string, any>): boolean {
    if (Array.isArray(data)) {
        return data.length === 0;
    }
    if (typeof data === 'object' && data !== null) {
        return Object.keys(data).length === 0;
    }
    return true;
}