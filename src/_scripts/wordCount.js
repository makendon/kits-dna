export function wordCount(content) {
    if (!content) return 0;
    const words = content.trim().split(/\s+/);
    return words.length;
}