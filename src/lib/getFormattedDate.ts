export default function getFormattedDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', { month: "long", year: "numeric" }).format(new Date(dateString))
}