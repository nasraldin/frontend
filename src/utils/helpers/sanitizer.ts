import { AppRegex, PasswordLength } from '~/constants';

/**
 * Formats a numeric input within a specified range by appending a "+" sign to numbers greater than or equal to the range's lower boundary.
 *
 * @param {number} count - The numeric value to be formatted.
 * @param range - The specified range's lower boundary. Numbers greater than or equal to this boundary will have a "+" sign appended. Default is 10.
 * @returns {string} The formatted string based on the input number and range.
 * @throws {Error} If count or range is not a valid number.
 *
 * @example
 * formatCountWithPlusSign(5);  // Returns: "5"
 * formatCountWithPlusSign(10); // Returns: "10+"
 * formatCountWithPlusSign(15); // Returns: "10+"
 * formatCountWithPlusSign(20); // Returns: "20+"
 * formatCountWithPlusSign(25, 20); // Returns: "20+"
 * formatCountWithPlusSign(40, 20); // Returns: "40+"
 */
export function formatCountWithPlusSign(count: number, range = 10): string {
  if (typeof count !== 'number' || isNaN(count)) {
    throw new Error('formatCountWithPlusSign: Invalid count');
  }

  if (typeof range !== 'number' || isNaN(range) || range <= 0) {
    throw new Error('formatCountWithPlusSign: Invalid range');
  }

  if (count >= range) {
    const lowerBound = Math.floor(count / range) * range;
    return `${lowerBound}+`;
  }

  return count.toString();
}

/**
 * Sanitizes the alt text for an image, or returns a default if no valid alt text is provided.
 *
 * This function performs the following operations:
 * 1. If no alt text is provided or it's empty after sanitization, returns a default alt text.
 * 2. Trims whitespace from the beginning and end of the text.
 * 3. Removes any HTML tags.
 * 4. Replaces multiple spaces with a single space.
 * 5. Truncates the text to a maximum length (default 100 characters).
 * 6. Escapes special characters to prevent XSS attacks.
 *
 * @param {string} alt - The original alt text to be sanitized.
 * @param maxLength - The maximum length for the alt text.
 * @param defaultAlt - The default alt text to use if no valid alt is provided.
 * @returns {string} The sanitized alt text or the default alt text.
 *
 * @example
 * imgAltSanitizer('  <script>alert("XSS")</script>Image   of a cat  ');
 * // Returns: 'Image of a cat'
 *
 * imgAltSanitizer('', 100, 'Default image description');
 * // Returns: 'Default image description'
 *
 * imgAltSanitizer(undefined, 20, 'No description');
 * // Returns: 'No description'
 */
export function imgAltSanitizer(
  alt?: string,
  maxLength = 100,
  defaultAlt = 'Image',
): string {
  if (typeof alt !== 'string' || alt.trim() === '') {
    return defaultAlt;
  }

  // Trim whitespace
  let sanitized = alt.trim();

  // Remove HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Replace multiple spaces with a single space
  sanitized = sanitized.replace(/\s+/g, ' ');

  // If after sanitization the string is empty, return the default
  if (sanitized === '') {
    return defaultAlt;
  }

  // Truncate to maxLength
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength - 3) + '...';
  }

  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  return sanitized;
}

interface PasswordCriteria {
  label: string;
  test: (password: string) => boolean;
  key: string;
}

// Password validation criteria
export const getPasswordCriteria = (): PasswordCriteria[] => [
  {
    label: 'passwordValidation.criteria.length',
    test: (password: string) => AppRegex.PasswordLength.test(password),
    key: 'length',
  },
  {
    label: 'passwordValidation.criteria.maxLength',
    test: (password: string) => password.length <= PasswordLength.Max,
    key: 'maxLength',
  },
  {
    label: 'passwordValidation.criteria.uppercase',
    test: (password: string) => AppRegex.PasswordUppercase.test(password),
    key: 'uppercase',
  },
  {
    label: 'passwordValidation.criteria.lowercase',
    test: (password: string) => AppRegex.PasswordLowercase.test(password),
    key: 'lowercase',
  },
  {
    label: 'passwordValidation.criteria.number',
    test: (password: string) => AppRegex.PasswordNumber.test(password),
    key: 'number',
  },
  {
    label: 'passwordValidation.criteria.special',
    test: (password: string) => AppRegex.PasswordSpecial.test(password),
    key: 'special',
  },
];

/**
 * Truncates a given text to a specified maximum length, preserving whole words.
 * Optionally adds an ellipsis at the end of the truncated text.
 *
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - The maximum length of the truncated text (including ellipsis if used).
 * @param {boolean} [addEllipsis=false] - Whether to add an ellipsis (...) at the end of truncated text.
 * @returns {string} The truncated text, ensuring it doesn't cut off within a word.
 *
 * @example
 * truncateWords("The quick brown fox jumps over the lazy dog", 20);
 * // Returns: "The quick brown fox"
 *
 * truncateWords("The quick brown fox jumps over the lazy dog", 20, true);
 * // Returns: "The quick brown..."
 *
 * truncateWords("Short text", 20);
 * // Returns: "Short text"
 *
 * @throws {Error} If maxLength is not a positive number.
 */
export function truncateWords(
  text: string,
  maxLength: number,
  addEllipsis?: false,
): string {
  if (typeof maxLength !== 'number' || maxLength <= 0) {
    throw new Error('maxLength must be a positive number');
  }

  if (!text) return '';

  const ellipsis = '...';
  const actualMaxLength = addEllipsis ? maxLength - ellipsis.length : maxLength;

  if (text.length <= actualMaxLength) {
    return text;
  }

  const words = text.slice(0, actualMaxLength).split(' ');
  words.pop(); // Remove last (potentially partial) word
  return (words.join(' ') + (addEllipsis ? ellipsis : '')).trim();
}
