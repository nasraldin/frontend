/**
 * Retrieves the name of a property from an object type or a function that accesses a property.
 *
 * This function can be used in two ways:
 * 1. With a direct property name of type T.
 * 2. With a function that accesses a property of type T.
 *
 * @template T The type of the object from which to retrieve the property name.
 *
 * @param nameOrFunction Either a key of T or a function that takes an object of type T and returns a property value.
 *
 * @returns A string representing the name of the property.
 *
 * @example
 * interface User {
 *   name: string;
 *   age: number;
 * }
 *
 * // Using with a direct property name
 * console.log(_nameOf<User>('name')); // Outputs: "name"
 *
 * // Using with a function
 * console.log(_nameOf<User>(u => u.age)); // Outputs: "age"
 */
export function _nameOf<T extends object>(
  nameOrFunction: keyof T | ((obj: T) => unknown),
): string {
  if (typeof nameOrFunction === 'string') {
    return nameOrFunction;
  }

  const regex = /(?<=\.|\s)\w+(?=[\s,]*$)/;
  const match = regex.exec(nameOrFunction.toString());
  return match ? match[0] : '';
}
