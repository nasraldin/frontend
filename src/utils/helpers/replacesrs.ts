/**
 * Recursively replaces a placeholder value in an object with a specified replacement.
 *
 * This function traverses through all properties of an object (including nested objects)
 * and replaces any string value that exactly matches the placeholder with the replacement value.
 *
 * @param obj - The object to modify. This object is mutated in place.
 * @param placeholder - The string value to be replaced.
 * @param replacement - The value to replace the placeholder with.
 *
 * @example
 * const data = {
 *   name: "Nasr",
 *   age: "{AGE}",
 *   address: {
 *     street: "{STREET}",
 *     city: "New York"
 *   }
 * };
 * replacePlaceholder(data, "{AGE}", 30);
 * replacePlaceholder(data, "{STREET}", "123 Main St");
 * console.log(data);
 * // Output:
 * // {
 * //   name: "Nasr",
 * //   age: 30,
 * //   address: {
 * //     street: "123 Main St",
 * //     city: "New York"
 * //   }
 * // }
 *
 * @throws {TypeError} If obj is null or not an object.
 */
export function replacePlaceholder<T extends Record<string, unknown>>(
  obj: T,
  placeholder: string,
  replacement: unknown,
): void {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError('First argument must be an object');
  }

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      replacePlaceholder(
        value as Record<string, unknown>,
        placeholder,
        replacement,
      );
    } else if (typeof value === 'string' && value === placeholder) {
      (obj as Record<string, unknown>)[key] = replacement;
    }
  }
}

/**
 * Replaces placeholders in a string value based on the placeholder map.
 *
 * @param value - The string value to process.
 * @param placeholderMap - An object mapping placeholders to their replacements.
 * @returns The replaced value.
 */
function replaceStringPlaceholders(
  value: string,
  placeholderMap: Record<string, unknown>,
): unknown {
  let newValue: unknown = value;
  for (const [placeholder, replacement] of Object.entries(placeholderMap)) {
    if (typeof replacement === 'string') {
      const regex = new RegExp(`\\b${placeholder}\\b`, 'g');
      newValue = (newValue as string).replace(regex, replacement);
    }
    if (value === placeholder) {
      newValue = replacement;
      break;
    }
  }
  return newValue;
}

/**
 * Recursively replaces multiple placeholders in an object with their corresponding replacements.
 *
 * This function traverses through all properties of an object (including nested objects)
 * and replaces string values that match placeholders defined in the placeholderMap.
 * It supports both full string matches and word boundary matches within strings.
 *
 * @param obj - The object to modify. This object is mutated in place.
 * @param placeholderMap - An object mapping placeholders to their replacements.
 *
 * @example
 * const data = {
 *   name: "Nasr {LASTNAME}",
 *   age: "{AGE}",
 *   address: {
 *     street: "{STREET}",
 *     city: "New York"
 *   }
 * };
 * const placeholders = {
 *   LASTNAME: "Aldin",
 *   AGE: 30,
 *   STREET: "123 Main St"
 * };
 * replacePlaceholders(data, placeholders);
 * console.log(data);
 * // Output:
 * // {
 * //   name: "Nasr Aldin",
 * //   age: 30,
 * //   address: {
 * //     street: "123 Main St",
 * //     city: "New York"
 * //   }
 * // }
 *
 * @throws {TypeError} If obj is null or not an object.
 */
export function replacePlaceholders<T>(
  obj: T,
  placeholderMap: Record<string, unknown>,
): void {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError('First argument must be an object');
  }

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      replacePlaceholders(value as Record<string, unknown>, placeholderMap);
    } else if (typeof value === 'string') {
      (obj as Record<string, unknown>)[key] = replaceStringPlaceholders(
        value,
        placeholderMap,
      );
    }
  }
}

/**
 * Recursively replaces keys in an object based on a provided mapping.
 *
 * This function traverses through all properties of an object (including nested objects and arrays)
 * and replaces the keys according to the provided replacers map. If a key is not found in the
 * replacers map, it remains unchanged.
 *
 * @param obj - The object to modify. This object is not mutated; a new object is returned.
 * @param replacers - An array of objects containing the key-replacer pairs.
 *
 * @returns A new object with the keys replaced according to the replacers map.
 *
 * @example
 * const data = {
 *   name: "Nasr",
 *   age: 30,
 *   address: {
 *     street: "123 Main St",
 *     city: "New York"
 *   },
 *   hobbies: ["reading", "hiking"]
 * };
 *
 * const replacers = [
 *   { key: "name", replacer: "fullName" },
 *   { key: "address", replacer: "location" }
 * ];
 *
 * const newData = deepReplaceKeys(data, replacers);
 * console.log(newData);
 * // Output:
 * // {
 * //   fullName: "Nasr",
 * //   age: 30,
 * //   location: {
 * //     street: "123 Main St",
 * //     city: "New York"
 * //   },
 * //   hobbies: ["reading", "hiking"]
 * // }
 */
export function deepReplaceKeys(
  obj: unknown,
  replacers: { key: string; replacer: string }[],
): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepReplaceKeys(item, replacers));
  }

  const newObj: Record<string, unknown> = {};

  for (const key in obj as Record<string, unknown>) {
    if (Object.hasOwn(obj, key)) {
      const lowerKey = key.toLowerCase();
      const replacer = replacers.find((r) => r.key.toLowerCase() === lowerKey);
      const newKey = replacer ? replacer.replacer : key;
      newObj[newKey] = deepReplaceKeys(
        (obj as Record<string, unknown>)[key],
        replacers,
      );
    }
  }

  return newObj;
}
