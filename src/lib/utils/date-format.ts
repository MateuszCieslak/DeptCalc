export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}