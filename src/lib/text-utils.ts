
/**
 * Converts a string to title case (capitalizes first letter of each word)
 * @param str - The string to convert
 * @returns The string in title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Converts kebab-case or snake_case to title case
 * @param str - The string to convert (e.g., "dry-cleaning" or "fabric_care")
 * @returns The string in title case (e.g., "Dry Cleaning" or "Fabric Care")
 */
export function formatCategoryName(str: string): string {
  if (!str) return '';
  
  return str
    .replace(/[-_]/g, ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
