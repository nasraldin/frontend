import * as v from 'valibot';

import { AppRegex } from '~/constants/regex';

/**
 * Comprehensive security-focused validators
 * Following OWASP guidelines and security best practices
 */
export const validators = {
  // ===== DOMAIN & URL VALIDATORS =====
  /**
   * Validates ajrly.com domain and its subdomains (no paths)
   */
  appDomain: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.AjrlyDomain.test(input as string),
        'Invalid domain. Must be ajrly.com or its subdomains (e.g., stage.ajrly.com)',
      ),
    ),

  /**
   * Validates ajrly.com domain with optional paths
   */
  appDomainWithPath: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.AjrlyDomainWithPath.test(input as string),
        'Invalid domain. Must be ajrly.com with optional path (e.g., stage.ajrly.com/api)',
      ),
    ),

  /**
   * Validates any domain format
   */
  domain: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Domain.test(input as string),
        'Invalid domain format',
      ),
    ),

  /**
   * Validates HTTPS URLs only
   */
  httpsUrl: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.HTTPS_URL.test(input as string),
        'Invalid HTTPS URL format',
      ),
    ),

  /**
   * Validates any URL format
   */
  url: () =>
    v.pipe(
      v.string(),
      v.custom((input) => AppRegex.URL.test(input as string), 'Invalid URL format'),
    ),

  // ===== USER INPUT VALIDATORS =====
  /**
   * Validates username format
   */
  username: () =>
    v.pipe(
      v.string(),
      v.minLength(3, 'Username must be at least 3 characters'),
      v.maxLength(30, 'Username must be less than 30 characters'),
      v.custom(
        (input) => AppRegex.Username.test(input as string),
        'Username must contain only letters, numbers, dots, underscores, or hyphens',
      ),
    ),

  /**
   * Validates display name format
   */
  displayName: () =>
    v.pipe(
      v.string(),
      v.minLength(2, 'Display name must be at least 2 characters'),
      v.maxLength(50, 'Display name must be less than 50 characters'),
      v.custom(
        (input) => AppRegex.DisplayName.test(input as string),
        'Display name contains invalid characters',
      ),
    ),

  /**
   * Validates full name format
   */
  fullName: () =>
    v.pipe(
      v.string(),
      v.minLength(2, 'Full name must be at least 2 characters'),
      v.maxLength(100, 'Full name must be less than 100 characters'),
      v.custom(
        (input) => AppRegex.FullName.test(input as string),
        'Full name contains invalid characters',
      ),
    ),

  /**
   * Validates email format
   */
  email: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Email.test(input as string),
        'Invalid email format',
      ),
    ),

  /**
   * Validates phone number format
   */
  phone: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Phone.test(input as string),
        'Invalid phone number format',
      ),
    ),

  /**
   * Validates international phone number format
   */
  phoneInternational: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.PhoneInternational.test(input as string),
        'Invalid international phone number format',
      ),
    ),

  // ===== SECURITY VALIDATORS =====
  /**
   * Validates UUID format
   */
  uuid: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.UUID.test(input as string),
        'Invalid UUID format',
      ),
    ),

  /**
   * Validates UUID v4 format
   */
  uuidv4: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.UUIDv4.test(input as string),
        'Invalid UUID v4 format',
      ),
    ),

  /**
   * Validates JWT token format
   */
  jwt: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.JWT.test(input as string),
        'Invalid JWT token format',
      ),
    ),

  /**
   * Validates Base64 format
   */
  base64: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Base64.test(input as string),
        'Invalid Base64 format',
      ),
    ),

  /**
   * Validates API key format
   */
  apiKey: () =>
    v.pipe(
      v.string(),
      v.minLength(32, 'API key must be at least 32 characters'),
      v.maxLength(64, 'API key must be less than 64 characters'),
      v.custom(
        (input) => AppRegex.APIKey.test(input as string),
        'Invalid API key format',
      ),
    ),

  // ===== PASSWORD VALIDATORS =====
  /**
   * Validates strong password (12+ chars, mixed case, numbers, special chars)
   */
  strongPassword: () =>
    v.pipe(
      v.string(),
      v.minLength(12, 'Password must be at least 12 characters'),
      v.maxLength(128, 'Password must be less than 128 characters'),
      v.custom(
        (input) => AppRegex.StrongPassword.test(input as string),
        'Password must contain uppercase, lowercase, numbers, and special characters',
      ),
    ),

  /**
   * Validates medium password (8+ chars, mixed case, numbers)
   */
  mediumPassword: () =>
    v.pipe(
      v.string(),
      v.minLength(8, 'Password must be at least 8 characters'),
      v.maxLength(128, 'Password must be less than 128 characters'),
      v.custom(
        (input) => AppRegex.MediumPassword.test(input as string),
        'Password must contain uppercase, lowercase, and numbers',
      ),
    ),

  // ===== NUMERIC VALIDATORS =====
  /**
   * Validates positive integer
   */
  positiveInteger: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.PositiveInteger.test(input as string),
        'Must be a positive integer',
      ),
    ),

  /**
   * Validates decimal number
   */
  decimal: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Decimal.test(input as string),
        'Must be a valid decimal number',
      ),
    ),

  /**
   * Validates percentage (0-100)
   */
  percentage: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Percentage.test(input as string),
        'Must be a valid percentage (0-100)',
      ),
    ),

  // ===== DATE & TIME VALIDATORS =====
  /**
   * Validates date format (YYYY-MM-DD)
   */
  date: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Date.test(input as string),
        'Invalid date format. Use YYYY-MM-DD',
      ),
    ),

  /**
   * Validates datetime format (ISO 8601)
   */
  dateTime: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.DateTime.test(input as string),
        'Invalid datetime format. Use ISO 8601',
      ),
    ),

  /**
   * Validates year format
   */
  year: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Year.test(input as string),
        'Invalid year format. Use YYYY',
      ),
    ),

  // ===== BUSINESS LOGIC VALIDATORS =====
  /**
   * Validates currency amount
   */
  currency: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Currency.test(input as string),
        'Invalid currency format',
      ),
    ),

  /**
   * Validates price format
   */
  price: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Price.test(input as string),
        'Invalid price format',
      ),
    ),

  /**
   * Validates SKU format
   */
  sku: () =>
    v.pipe(
      v.string(),
      v.minLength(3, 'SKU must be at least 3 characters'),
      v.maxLength(20, 'SKU must be less than 20 characters'),
      v.custom(
        (input) => AppRegex.SKU.test(input as string),
        'Invalid SKU format. Use uppercase letters, numbers, and hyphens',
      ),
    ),

  /**
   * Validates barcode format
   */
  barcode: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Barcode.test(input as string),
        'Invalid barcode format. Must be 8-14 digits',
      ),
    ),

  // ===== FILE & PATH VALIDATORS =====
  /**
   * Validates safe filename
   */
  safeFileName: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.SafeFileName.test(input as string),
        'Invalid filename. Contains unsafe characters',
      ),
    ),

  /**
   * Validates safe file path
   */
  safePath: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.SafePath.test(input as string),
        'Invalid file path. Contains unsafe characters',
      ),
    ),

  /**
   * Validates path without traversal attacks
   */
  noPathTraversal: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.NoPathTraversal.test(input as string),
        'Invalid path. Path traversal not allowed',
      ),
    ),

  // ===== GEOGRAPHIC VALIDATORS =====
  /**
   * Validates latitude
   */
  latitude: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Latitude.test(input as string),
        'Invalid latitude. Must be between -90 and 90',
      ),
    ),

  /**
   * Validates longitude
   */
  longitude: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Longitude.test(input as string),
        'Invalid longitude. Must be between -180 and 180',
      ),
    ),

  /**
   * Validates country code
   */
  countryCode: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.CountryCode.test(input as string),
        'Invalid country code. Must be 2 uppercase letters',
      ),
    ),

  // ===== SOCIAL MEDIA VALIDATORS =====
  /**
   * Validates Twitter handle
   */
  twitterHandle: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.TwitterHandle.test(input as string),
        'Invalid Twitter handle format',
      ),
    ),

  /**
   * Validates Instagram handle
   */
  instagramHandle: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.InstagramHandle.test(input as string),
        'Invalid Instagram handle format',
      ),
    ),

  /**
   * Validates GitHub username
   */
  githubUsername: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.GitHubUsername.test(input as string),
        'Invalid GitHub username format',
      ),
    ),

  // ===== TECHNICAL VALIDATORS =====
  /**
   * Validates semantic version
   */
  semVer: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.SemVer.test(input as string),
        'Invalid semantic version format',
      ),
    ),

  /**
   * Validates IP address
   */
  ipAddress: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.IPAddress.test(input as string),
        'Invalid IP address format',
      ),
    ),

  /**
   * Validates IPv6 address
   */
  ipv6: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.IPv6.test(input as string),
        'Invalid IPv6 address format',
      ),
    ),

  // ===== UTILITY VALIDATORS =====
  /**
   * Validates slug format
   */
  slug: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Slug.test(input as string),
        'Invalid slug format. Use lowercase letters, numbers, and hyphens',
      ),
    ),

  /**
   * Validates tag format
   */
  tag: () =>
    v.pipe(
      v.string(),
      v.minLength(1, 'Tag must be at least 1 character'),
      v.maxLength(30, 'Tag must be less than 30 characters'),
      v.custom((input) => AppRegex.Tag.test(input as string), 'Invalid tag format'),
    ),

  /**
   * Validates locale format
   */
  locale: () =>
    v.pipe(
      v.string(),
      v.custom(
        (input) => AppRegex.Locale.test(input as string),
        'Invalid locale format. Use format like "en" or "en-US"',
      ),
    ),
} as const;
