import type { FetchEvent } from '@solidjs/start/server';

import type { RequestContext } from './types';

/**
 * Extended FetchEvent with context
 */
export type FetchEventWithContext = FetchEvent & {
  context: RequestContext;
};

/**
 * Safely gets the request context from a FetchEvent
 * @param event The FetchEvent
 * @returns The request context
 */
export function getRequestContext(event: FetchEvent): RequestContext {
  const eventWithContext = event as FetchEvent & { context?: RequestContext };
  return eventWithContext.context || {};
}

/**
 * Safely sets a value in the request context
 * @param event The FetchEvent
 * @param key The context key
 * @param value The value to set
 */
export function setRequestContext(
  event: FetchEvent,
  key: string,
  value: unknown,
): void {
  const eventWithContext = event as FetchEventWithContext;
  eventWithContext.context = eventWithContext.context || {};
  (eventWithContext.context as Record<string, unknown>)[key] = value;
}

/**
 * Safely gets a value from the request context
 * @param event The FetchEvent
 * @param key The context key
 * @returns The context value
 */
export function getRequestContextValue(event: FetchEvent, key: string): unknown {
  const context = getRequestContext(event);
  return (context as Record<string, unknown>)[key];
}

/**
 * Safely gets a typed value from the request context
 * @param event The FetchEvent
 * @param key The context key
 * @param defaultValue Default value if key doesn't exist
 * @returns The typed context value
 */
export function getRequestContextValueTyped<T>(
  event: FetchEvent,
  key: string,
  defaultValue: T,
): T {
  const value = getRequestContextValue(event, key);
  return (value as T) ?? defaultValue;
}

/**
 * Checks if a key exists in the request context
 * @param event The FetchEvent
 * @param key The context key
 * @returns True if the key exists
 */
export function hasRequestContextValue(event: FetchEvent, key: string): boolean {
  const context = getRequestContext(event);
  return key in (context as Record<string, unknown>);
}
