import { _nameOf } from './nameOf';

interface PropertyInfo<T, K extends keyof T> {
  name: string;
  value: T[K];
}

interface NestedPropertyInfo<V> {
  name: string;
  value: V | undefined;
  exists: boolean;
}

type NestedProperty<T, K extends string> = K extends `${infer F}.${infer R}`
  ? F extends keyof T
    ? NestedProperty<T[F], R>
    : undefined
  : K extends keyof T
    ? T[K]
    : undefined;

/**
 * Retrieves the name and value of a property from an object.
 *
 * @template T The type of the object from which to retrieve the property.
 * @template K The key type of the property to retrieve.
 *
 * @param obj The object from which to retrieve the property.
 * @param propertyName The name of the property to retrieve.
 *
 * @returns An object containing the name and value of the specified property.
 *
 * @example
 * interface User {
 *   name: string;
 *   age: number;
 * }
 *
 * const user: User = { name: 'Nasr Aldin', age: 33 };
 *
 * const nameInfo = getProperty(user, 'name');
 * console.log(nameInfo); // { name: 'name', value: 'Nasr Aldin' }
 *
 * const ageInfo = getProperty(user, 'age');
 * console.log(ageInfo); // { name: 'age', value: 33 }
 */
export function getProperty<T extends object, K extends keyof T>(
  obj: T,
  propertyName: K,
): PropertyInfo<T, K> {
  return {
    name: _nameOf<T>(propertyName),
    value: obj[propertyName],
  };
}

/**
 * Retrieves the value of a nested property from an object using a dot-separated path.
 *
 * @template T The type of the root object.
 * @template K A string literal type representing the dot-separated property path.
 *
 * @param obj The object from which to retrieve the nested property.
 * @param propertyPath A dot-separated string representing the path to the nested property.
 *
 * @returns An object containing:
 *   - name: The original property path string.
 *   - value: The value of the nested property, or undefined if not found.
 *   - exists: A boolean indicating whether the nested property exists.
 *
 * @example
 * interface User {
 *   name: string;
 *   address: {
 *     street: string;
 *     city: string;
 *   };
 * }
 *
 * const user: User = {
 *   name: 'Nasr Aldin',
 *   address: {
 *     street: '123 Main St',
 *     city: 'Anytown'
 *   }
 * };
 *
 * const nameInfo = getNestedProperty(user, 'name');
 * console.log(nameInfo); // { name: 'name', value: 'Nasr Aldin', exists: true }
 *
 * const streetInfo = getNestedProperty(user, 'address.street');
 * console.log(streetInfo); // { name: 'address.street', value: '123 Main St', exists: true }
 *
 * const countryInfo = getNestedProperty(user, 'address.country');
 * console.log(countryInfo); // { name: 'address.country', value: undefined, exists: false }
 */
export function getNestedProperty<T extends object, K extends string>(
  obj: T,
  propertyPath: K,
): NestedPropertyInfo<NestedProperty<T, K>> {
  const parts = propertyPath.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return { name: propertyPath, value: undefined, exists: false };
    }
    current = (current as Record<string, unknown>)[part];
  }

  return {
    name: propertyPath,
    value: current as NestedProperty<T, K>,
    exists: true,
  };
}
