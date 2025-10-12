/**
 * Domain validation utilities
 * Reads from src/data/allowed-domains.json
 */

import { AppConfig } from '~/config';
import { AppRegex } from '~/constants';

// Get the allowed domains from the JSON file
const ALLOWED_DOMAINS = AppConfig.allowedDomains.map((domain) =>
  domain.toLowerCase(),
);

export type AllowedDomain = (typeof ALLOWED_DOMAINS)[number];

/**
 * Check if an email domain is allowed
 * @param email - The email address to check
 * @returns true if the domain is allowed, false otherwise
 */
export function isAllowedDomain(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const domain = email.toLowerCase().split('@')[1];
  if (!domain) {
    return false;
  }

  return ALLOWED_DOMAINS.includes(domain);
}

/**
 * Check if an email domain is NOT allowed (blocked)
 * @param email - The email address to check
 * @returns true if the domain is blocked, false if allowed
 */
export function isBlockedDomain(email: string): boolean {
  return !isAllowedDomain(email);
}

/**
 * Get the domain from an email address
 * @param email - The email address
 * @returns The domain part of the email, or null if invalid
 */
export function getDomainFromEmail(email: string): string | null {
  if (!email || typeof email !== 'string') {
    return null;
  }

  const parts = email.toLowerCase().split('@');
  if (parts.length !== 2) {
    return null;
  }

  return parts[1];
}

/**
 * Get all allowed domains
 * @returns Array of allowed domains
 */
export function getAllowedDomains(): readonly string[] {
  return ALLOWED_DOMAINS;
}

/**
 * Validate email format and check if domain is allowed
 * @param email - The email address to validate
 * @returns Object with validation results
 */
export function validateEmail(email: string): {
  isValid: boolean;
  isAllowedDomain: boolean;
  domain: string | null;
  error?: string;
} {
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      isAllowedDomain: false,
      domain: null,
      error: 'Email is required',
    };
  }

  // Check email format
  if (!AppRegex.Email.test(email)) {
    return {
      isValid: false,
      isAllowedDomain: false,
      domain: null,
      error: 'Invalid email format',
    };
  }

  const domain = getDomainFromEmail(email);
  if (!domain) {
    return {
      isValid: false,
      isAllowedDomain: false,
      domain: null,
      error: 'Invalid email domain',
    };
  }

  const isAllowed = isAllowedDomain(email);

  return {
    isValid: true,
    isAllowedDomain: isAllowed,
    domain,
    error: isAllowed ? undefined : 'Domain not allowed',
  };
}
