/**
 * Security-focused Regex Constants
 * Following OWASP guidelines and security best practices
 */
export const AppRegex = {
  // ===== LANGUAGE & LOCALE =====
  Arabic: /^ar(-[a-z]{2})?$/i,
  Locale: /^[a-z]{2}(-[a-z]{2})?$/i,

  // ===== NUMERIC PATTERNS =====
  Number: /^\d+$/,
  Decimal: /^\d+(\.\d{1,2})?$/,
  Integer: /^-?\d+$/,
  PositiveInteger: /^[1-9]\d*$/,
  NegativeInteger: /^-\d+$/,
  Percentage: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/,

  // ===== TEXT PATTERNS =====
  AlphaOnly: /^[A-Za-z]+$/,
  AlphaNumeric: /^[A-Za-z0-9]+$/,
  AlphaNumericWithHyphens: /^[A-Za-z0-9-]+$/,
  AlphaNumericWithUnderscores: /^\w+$/,
  AlphaNumericWithDots: /^[A-Za-z0-9.]+$/,
  SafeText: /^[\w\s.-]+$/,
  MultilingualText: /^[A-Za-z0-9\s_.\u0600-\u06FF\u00C0-\u024F-]+$/,

  // ===== FILE & PATH PATTERNS =====
  SafeFileName: /^[A-Za-z0-9._\-\s\u0600-\u06FF]+$/,
  FileExtension: /^\.([A-Za-z0-9]+)$/,
  SafePath: /^[A-Za-z0-9/._\-\s]+$/,
  NoPathTraversal: /^(?!.*\.\.[/\\]).*$/,

  // ===== USER INPUT VALIDATION =====
  Name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/,
  Username: /^[a-zA-Z0-9._-]{3,30}$/,
  DisplayName: /^[A-Za-z0-9\s._-]{2,50}$/,
  FullName: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,100}$/,
  Slug: /^[a-z0-9-]+$/,
  Tag: /^[A-Za-z0-9\s-]{1,30}$/,

  // ===== CONTACT INFORMATION =====
  Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
  Phone: /^\+?[1-9]\d{1,14}$/,
  PhoneInternational: /^\+[1-9]\d{1,14}$/,
  PhoneNational: /^[1-9]\d{1,14}$/,

  // ===== SECURITY PATTERNS =====
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  UUIDv4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
  Base64: /^[A-Za-z0-9+/]*={0,2}$/,
  Hex: /^[0-9a-fA-F]+$/,
  SHA256: /^[a-f0-9]{64}$/,
  SHA1: /^[a-f0-9]{40}$/,
  MD5: /^[a-f0-9]{32}$/,

  // ===== PASSWORD SECURITY =====
  StrongPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
  MediumPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  PasswordLength: /^.{8,128}$/,

  // ===== URL & DOMAIN PATTERNS =====
  // Simplified URL pattern to reduce complexity
  URL: /^https?:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=-]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9()@:%_+.~#?&/=-]*)$/,
  HTTPS_URL:
    /^https:\/\/(www\.)?[a-zA-Z0-9@:%._+~#=-]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9()@:%_+.~#?&/=-]*)$/,
  Domain:
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/,
  // Simplified IP address pattern to reduce complexity
  IPAddress:
    /^(?:(?:25[0-5]|2[0-4]\d|1?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|1?\d{1,2})$/,
  IPv6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,

  // ===== AJRLY SPECIFIC DOMAINS =====
  AjrlyDomain:
    /^(https:\/\/)?(www\.)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*ajrly\.com$/,
  AjrlyDomainWithPath:
    /^(https:\/\/)?(www\.)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*ajrly\.com(\/.*)?$/,

  // ===== DATE & TIME =====
  Date: /^\d{4}-\d{2}-\d{2}$/,
  DateTime: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
  Time: /^\d{2}:\d{2}(:\d{2})?$/,
  Year: /^(19|20)\d{2}$/,
  Month: /^(0[1-9]|1[0-2])$/,
  Day: /^(0[1-9]|[12]\d|3[01])$/,
  Quarter: /^Q[1-4]$/,
  HandoverDate: /^(Q[1-4]\s\d{4}|\d{4})$/,

  // ===== BUSINESS LOGIC =====
  Currency: /^\d+(\.\d{2})?$/,
  Price: /^\d+(\.\d{1,2})?$/,
  SKU: /^[A-Z0-9-]{3,20}$/,
  Barcode: /^\d{8,14}$/,
  // Simplified ISBN pattern - complex validation should be done in code, not regex
  // Note: Complexity is high (68) but necessary for ISBN validation. Consider using a library for production.
  // ISBN: /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:\d+[- ]){3})[- 0-9X]{13}$|97[89]\d{10}$|(?=(?:\d+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?\d{1,5}[- ]?\d+[- ]?\d+[- ]?[0-9X]$/,

  // ===== API & TECHNICAL =====
  APIKey: /^[A-Za-z0-9]{32,64}$/,
  AccessToken: /^[A-Za-z0-9._-]{20,}$/,
  Version: /^\d+\.\d+(\.\d+)?(-[A-Za-z0-9]+)?$/,
  // Simplified SemVer pattern - complex validation should be done in code
  // Note: Complexity is high (59) but necessary for SemVer validation. Consider using a library for production.
  // SemVer validation is complex and should use a dedicated library like 'semver' in production
  SemVer:
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][\da-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][\da-zA-Z-]*))*))?(?:\+([\da-zA-Z-]+(?:\.[\da-zA-Z-]+)*))?$/, // NOSONAR

  // ===== SOCIAL & EXTERNAL =====
  TwitterHandle: /^@?\w{1,15}$/,
  InstagramHandle: /^@?[\w.]{1,30}$/,
  LinkedInHandle: /^[A-Za-z0-9-]{3,100}$/,
  GitHubUsername: /^[A-Za-z0-9-]{1,39}$/,

  // ===== GEOGRAPHIC =====
  Latitude: /^-?([1-8]?\d(\.\d{1,6})?|90(\.0{1,6})?)$/,
  Longitude: /^-?((1[0-7]\d)|([1-9]?\d))(\.\d{1,6})?$/,
  PostalCode: /^[A-Za-z0-9\s-]{3,10}$/,
  CountryCode: /^[A-Z]{2}$/,

  // ===== SECURITY HEADERS =====
  CSPDirective: /^[a-zA-Z0-9-]+$/,
  CSPSource:
    /^(self|unsafe-inline|unsafe-eval|none|'[^']*'|https?:\/\/[^/\s]+|\*)$/,
} as const;
