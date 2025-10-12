import clsx, { type ClassValue } from 'clsx';
import { twJoin, twMerge } from 'tailwind-merge';

import { isSSR } from './env';

/**
 * Combines multiple class values into a single string, merging and deduplicating classes.
 *
 * This function uses `clsx` to combine class values and `twMerge` to merge Tailwind CSS classes.
 * It's particularly useful for conditionally applying classes in React components or other UI frameworks.
 *
 * @param classes - Any number of class values. Each value can be a string, object, or array.
 * @returns A string of combined and merged class names.
 *
 * @example
 * // Basic usage
 * cn('foo', 'bar'); // 'foo bar'
 * cn('foo', { bar: true }); // 'foo bar'
 * cn({ 'foo-bar': false }); // ''
 * cn({ 'foo-bar': true }); // 'foo-bar'
 * cn('foo', { bar: true, 'baz': false }); // 'foo bar'
 *
 * // With Tailwind classes
 * cn('px-2 py-1 bg-red-500', 'hover:bg-red-600', { 'text-white': true });
 * // 'px-2 py-1 bg-red-500 hover:bg-red-600 text-white'
 *
 * // Merging conflicting Tailwind classes
 * cn('px-2 py-1', 'px-4'); // 'py-1 px-4'
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

/**
 * Combines and joins multiple class values into a single string.
 *
 * This function uses `clsx` to combine class values and `twJoin` to join them.
 * It's useful for conditionally applying classes, especially when working with
 * utility-first CSS frameworks like Tailwind CSS.
 *
 * @param classes - Any number of class values. Each value can be a string, object, or array.
 * @returns A string of combined class names.
 *
 * @example
 * // Basic usage
 * cnJoiner('foo', 'bar'); // 'foo bar'
 * cnJoiner('foo', { bar: true }); // 'foo bar'
 * cnJoiner({ 'foo-bar': false }); // ''
 * cnJoiner({ 'foo-bar': true }); // 'foo-bar'
 * cnJoiner('foo', { bar: true, 'baz': false }); // 'foo bar'
 *
 * // With Tailwind classes
 * cnJoiner('px-2 py-1 bg-red-500', 'hover:bg-red-600', { 'text-white': true });
 * // 'px-2 py-1 bg-red-500 hover:bg-red-600 text-white'
 *
 * // Note: Unlike `twMerge`, `twJoin` does not deduplicate or resolve conflicts
 * cnJoiner('px-2 py-1', 'px-4'); // 'px-2 py-1 px-4'
 */
export const cnJoiner = (...classes: ClassValue[]): string => {
  return twJoin(clsx(classes));
};

/**
 * Assigns CSS classes to DOM elements based on their IDs.
 *
 * This function is designed to be used in browser environments to dynamically
 * add classes to elements. It's optimized for performance and handles multiple
 * class assignments in a single call.
 *
 * @param classes - An array of objects, each containing an element ID and the classes to assign.
 *
 * @example
 * classAssigned([
 *   { elId: 'header', classes: 'bg-blue-500 text-white' },
 *   { elId: 'footer', classes: ['mt-4', { 'bg-gray-200': isDarkMode }] }
 * ]);
 *
 * @performance
 * - Uses `getElementById` for faster element selection.
 * - Batches DOM operations to minimize reflows.
 * - Skips processing if not in a browser environment.
 * - Uses `clsx` for efficient class name concatenation.
 *
 * @note This function mutates the DOM and should be used cautiously.
 */
export const classAssigned = (
  classes: { elId: string; classes: ClassValue | ClassValue[] }[],
): void => {
  if (isSSR) return;

  if (classes.length === 0) return;

  // Use requestAnimationFrame to batch DOM updates
  requestAnimationFrame(() => {
    classes.forEach(({ elId, classes: classValues }) => {
      const element = document.getElementById(elId);
      if (element && classValues) {
        const classString = clsx(classValues);
        if (classString) {
          element.classList.add(...classString.split(' '));
        }
      }
    });
  });
};
