/**
 * Creates a promise that resolves after a specified delay.
 *
 * This function can be used to pause execution in async functions or to create
 * delays in any promise chain.
 *
 * @param ms - The number of milliseconds to wait before resolving the promise.
 * @returns A promise that resolves after the specified delay.
 * @throws Will throw an error if ms is not a positive number.
 *
 * @example
 * // Using in an async function
 * async function example() {
 *   console.log('Start');
 *   await waitFor(2000);
 *   console.log('2 seconds later');
 * }
 *
 * @example
 * // Using in a promise chain
 * someAsyncFunction()
 *   .then(() => waitFor(1000))
 *   .then(() => console.log('1 second later'));
 *
 * @example
 * // Error case
 * waitFor(-1000).catch(error => console.error(error));
 * // Output: Error: Delay must be a positive number
 */
export const waitFor = (ms: number): Promise<void> => {
  if (typeof ms !== 'number' || ms < 0) {
    return Promise.reject(new Error('Delay must be a positive number'));
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
};
