import {
  addDays,
  differenceInDays,
  format,
  isAfter,
  isBefore,
  parseISO,
} from 'date-fns';

/**
 * Formats a date string into a human-readable format.
 *
 * @param dateString - A string representing a date (e.g., ISO 8601 format)
 * @returns A formatted date string (e.g., "August 20, 2022")
 * @throws Will throw an error if the input string is not a valid date
 *
 * @example
 * const formattedDate = humanDate('2023-05-15T10:30:00Z');
 * console.log(formattedDate); // Output: "May 15, 2023"
 */
export const humanDate = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }
  return format(date, 'LLLL d, yyyy');
};

/**
 * Converts a date string to UTC format.
 *
 * @param dateString - A string representing a date (e.g., ISO 8601 format)
 * @returns A UTC date string
 * @throws Will throw an error if the input string is not a valid date
 *
 * @example
 * const utcDate = parseDateUTC('2023-05-15T10:30:00Z');
 * console.log(utcDate); // Output: "Mon, 15 May 2023 10:30:00 GMT"
 */
export const parseDateUTC = (dateString: string): string => {
  const date = parseISO(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }
  return date.toUTCString();
};

/**
 * Checks if a given end date has passed.
 *
 * @param endDateString - A string representing the end date (e.g., ISO 8601 format)
 * @returns True if the end date has passed, false otherwise
 * @throws Will throw an error if the input string is not a valid date
 *
 * @example
 * const hasEnded = isEnded('2023-05-15T10:30:00Z');
 * console.log(hasEnded); // Output: true (if current date is after May 15, 2023)
 */
export const isEnded = (endDateString: string): boolean => {
  const endDate = parseISO(endDateString);
  if (isNaN(endDate.getTime())) {
    throw new Error('Invalid date string provided');
  }
  return isAfter(new Date(), endDate);
};

/**
 * Calculates the number of days between two dates.
 *
 * @param startDateString - A string representing the start date (e.g., ISO 8601 format)
 * @param endDateString - A string representing the end date (e.g., ISO 8601 format)
 * @returns The number of days between the two dates
 * @throws Will throw an error if either input string is not a valid date
 *
 * @example
 * const days = daysBetween('2023-05-15T10:30:00Z', '2023-05-20T10:30:00Z');
 * console.log(days); // Output: 5
 */
export const daysBetween = (
  startDateString: string,
  endDateString: string,
): number => {
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid date string provided');
  }
  return differenceInDays(endDate, startDate);
};

/**
 * Checks if a date is within a specified range.
 *
 * @param dateString - A string representing the date to check (e.g., ISO 8601 format)
 * @param startDateString - A string representing the start of the range (e.g., ISO 8601 format)
 * @param endDateString - A string representing the end of the range (e.g., ISO 8601 format)
 * @returns True if the date is within the range, false otherwise
 * @throws Will throw an error if any input string is not a valid date
 *
 * @example
 * const inRange = isDateInRange('2023-05-17T10:30:00Z', '2023-05-15T00:00:00Z', '2023-05-20T23:59:59Z');
 * console.log(inRange); // Output: true
 */
export const isDateInRange = (
  dateString: string,
  startDateString: string,
  endDateString: string,
): boolean => {
  const date = parseISO(dateString);
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);
  if (
    isNaN(date.getTime()) ||
    isNaN(startDate.getTime()) ||
    isNaN(endDate.getTime())
  ) {
    throw new Error('Invalid date string provided');
  }
  return isAfter(date, startDate) && isBefore(date, endDate);
};

/**
 * Adds a specified number of days to a given date.
 *
 * @param dateString - A string representing the starting date (e.g., ISO 8601 format)
 * @param days - The number of days to add (can be negative to subtract days)
 * @returns A new date string in ISO 8601 format
 * @throws Will throw an error if the input string is not a valid date
 *
 * @example
 * const newDate = addDaysToDate('2023-05-15T10:30:00Z', 5);
 * console.log(newDate); // Output: "2023-05-20T10:30:00.000Z"
 */
export const addDaysToDate = (dateString: string, days: number): string => {
  const date = parseISO(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }
  return addDays(date, days).toISOString();
};
