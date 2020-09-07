export default function decrypt(key: string): boolean {
    return decryptSimplet(key);
}

export function decryptSimplet(key: string): boolean {
    if (key === 'key') {
        return true;
    } else {
        return false;
    }
}