import { Lookup } from '~/models/db';
import { logger } from '~/utils/logger';

/**
 * Filters and extracts values from an array of Lookup objects based on group keys.
 *
 * @param {Lookup[]} data - An array of Lookup objects to filter and extract values from.
 * @param {string[]} groupKeys - An array of group keys to filter by.
 * @returns {(string | string[])[]} An array of values extracted from Lookup objects matching the group keys.
 *
 * @example
 * const data: Lookup[] = [
 *   { code: '1', name: 'Item 1', value: 'Value 1', groupKey: 'Group A', parentId: 'parent1' },
 *   { code: '2', name: 'Item 2', value: ['Value 2A', 'Value 2B'], groupKey: ['Group B', 'Group C'], parentId: 'parent1' },
 *   { code: '3', name: 'Item 3', value: 'Value 3', groupKey: 'Group C', parentId: 'parent2' },
 * ];
 *
 * const result = getValuesInRange(data, ['Group A', 'Group C']);
 * console.log(result);
 * // Output: ['Value 1', ['Value 2A', 'Value 2B'], 'Value 3']
 *
 * @example
 * const data: Lookup[] = [
 *   { code: '1', name: 'Item 1', value: 'Value 1', groupKey: 'Group X', parentId: 'parent1' },
 *   { code: '2', name: 'Item 2', value: ['Value 2A', 'Value 2B'], groupKey: ['Group Y', 'Group Z'], parentId: 'parent1' },
 * ];
 *
 * const result = getValuesInRange(data, ['Group A']);
 * console.log(result);
 * // Output: []
 */
export function getValuesInRange(
  data: Lookup[],
  groupKeys: string[],
): (string | string[])[] {
  return data
    .filter((entry: Lookup) => {
      if (typeof entry.groupKey === 'string') {
        return groupKeys.includes(entry.groupKey);
      } else if (Array.isArray(entry.groupKey)) {
        return entry.groupKey.some((key) => groupKeys.includes(key));
      }
      return false;
    })
    .map((entry: Lookup) => entry.value);
}

/**
 * Finds duplicate codes in an array of Lookup objects and logs the duplicate codes if found.
 *
 * @param {Lookup[]} arr - An array of Lookup objects with a 'code' property to be checked for duplicates.
 * @returns {string[]} An array of duplicate codes found in the input array.
 *
 * @example
 * const data: Lookup[] = [
 *   { code: '1', name: 'Item 1', value: 'Value 1', groupKey: 'Group A', parentId: 'parent1' },
 *   { code: '2', name: 'Item 2', value: 'Value 2', groupKey: 'Group B', parentId: 'parent1' },
 *   { code: '1', name: 'Item 3', value: 'Value 3', groupKey: 'Group A', parentId: 'parent2' },
 * ];
 *
 * const duplicateCodes = findCodeDuplicates(data);
 * console.log(duplicateCodes); // Output: ['1']
 *
 * @example
 * const data: Lookup[] = [
 *   { code: '1', name: 'Item 1', value: 'Value 1', groupKey: 'Group A', parentId: 'parent1' },
 *   { code: '2', name: 'Item 2', value: 'Value 2', groupKey: 'Group B', parentId: 'parent1' },
 *   { code: '3', name: 'Item 3', value: 'Value 3', groupKey: 'Group C', parentId: 'parent2' },
 * ];
 *
 * const duplicateCodes = findCodeDuplicates(data);
 * console.log(duplicateCodes); // Output: []
 */
export function findCodeDuplicates(arr: Lookup[]): string[] {
  if (!Array.isArray(arr) || arr.length === 0) {
    logger.info('No data provided to check for duplicate codes.');
    return [];
  }

  const codeSet = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of arr) {
    if (typeof item.code !== 'string') {
      logger.warn(`Invalid code found: ${item.code}. Skipping...`);
      continue;
    }

    if (codeSet.has(item.code)) {
      duplicates.add(item.code);
    } else {
      codeSet.add(item.code);
    }
  }

  const duplicateCodes = Array.from(duplicates);

  if (duplicateCodes.length > 0) {
    logger.warn({ duplicateCodes }, 'Duplicate codes found:');
  } else {
    logger.info('No duplicate codes found.');
  }

  return duplicateCodes;
}
