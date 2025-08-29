function stringToHash(str: string) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return hash;
    }


export function generateColorFromId(id: string): string {
    const hash = stringToHash(id);
    const hue = Math.abs(hash % 360);
    const saturation = 70;
    const lightness = 85;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}