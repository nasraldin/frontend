import { JSX } from 'solid-js';

/**
 * Represents an object with string keys and values of unknown type.
 *
 * This type is useful for objects with a dynamic structure where the keys are known to be strings,
 * but the value types are not predetermined.
 *
 * @example
 * const dynamicObj: DynamicKey = {
 *     name: "Nasr",
 *     age: 30,
 *     isAdmin: false
 * };
 */
export type DynamicKey = Record<string, unknown>;

/**
 * Represents an object with string keys and values of a specified type T.
 *
 * This generic type allows for flexible object definitions where all values share the same type.
 * If no type is specified for T, it defaults to unknown.
 *
 * @template T - The type of the values in the object. Defaults to unknown if not specified.
 *
 * @example
 * // Using default unknown type
 * const genericObj1: GenericObject = {
 *     key1: "value",
 *     key2: 42,
 *     key3: true
 * };
 *
 * // Specifying string type for values
 * const genericObj2: GenericObject<string> = {
 *     firstName: "Nasr",
 *     lastName: "Mohamed",
 *     city: "Mallawi"
 * };
 *
 * // Using a union type for values
 * const genericObj3: GenericObject<string | number> = {
 *     name: "Taleen",
 *     age: 3,
 *     city: "Abu Dhabi"
 * };
 */
export type GenericObject<T = unknown> = Record<string, T>;

/**
 * Represents a value that can be of various types.
 *
 * This type is useful when you need to work with values of different types
 * but don't want to specify a particular type.
 *
 * @example
 * const stringValue: DynamicValue = "Hello";
 * const numberValue: DynamicValue = 42;
 * const booleanValue: DynamicValue = true;
 * const arrayValue: DynamicValue = [1, 2, 3];
 * const objectValue: DynamicValue = { key: "value" };
 */
export type DynamicValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | DynamicValue[]
  | { [key: string]: DynamicValue };

/**
 * Represents a value in a translation object.
 * It can be either a string or a nested object of translations.
 * Null and undefined are not allowed.
 *
 * @example
 * const simpleValue: TranslationValue = "Hello, World!";
 * const nestedValue: TranslationValue = {
 *   greeting: "Hello",
 *   farewell: {
 *     formal: "Goodbye",
 *     informal: "See you later"
 *   }
 * };
 */
export type TranslationValue = string | { [key: string]: TranslationValue };

/**
 * Utility type to ensure non-empty string keys
 */
export type NonEmptyString<T> = T extends '' ? never : T;

/**
 * Represents a key-value pair in a translation object.
 * The keys are strings, and the values are of type TranslationValue.
 * Null and undefined are not allowed as keys or values.
 *
 * @example
 * const translations: TranslationKey = {
 *   welcome: "Welcome to our app",
 *   nav: {
 *     home: "Home",
 *     about: "About",
 *     contact: "Contact Us"
 *   },
 *   profile: {
 *     greeting: "Hello, {name}!",
 *     stats: {
 *       followers: "Followers",
 *       following: "Following",
 *       posts: "Posts"
 *     }
 *   },
 *   errors: {
 *     notFound: "Page not found",
 *     serverError: "Internal server error"
 *   }
 * };
 *
 * // Usage:
 * const welcomeMessage = translations.welcome;
 * const contactLink = translations.nav.contact;
 * const profileGreeting = translations.profile.greeting.replace("{name}", "Alice");
 * const errorMessage = translations.errors.notFound;
 */
export type TranslationKey = {
  [K in string as NonEmptyString<K>]: TranslationValue;
};

export type SolidNode =
  | JSX.Element
  | string
  | number
  | null
  | undefined
  | SolidNode[];
