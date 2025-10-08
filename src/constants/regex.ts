/**
 * App Regex Constants
 */
export const AppRegex = {
  Arabic: /^ar(-|$)/i,
  Number: /^\d+$/,
  FileName: /^[a-zA-Z0-9_.\s\u0600-\u06FF]+$/,
  String: /^[A-Za-z]+$/,
  Characters: /^[A-Za-z0-9]+$/,
  Characters_: /^[A-Za-z0-9-_]+$/,
  AnyText: /^[a-zA-Z0-9\-+,_.()\s\u0600-\u06FF]+$/,
  StringAndNumbers: /^[A-Za-z0-9 &/.-]+$/,

  Username: /^[a-zA-Z0-9._-]{2,30}$/,
  Email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Password validation patterns
  PasswordLength: /.{8,}/,
  PasswordMaxLength: /.{1,64}/,
  PasswordUppercase: /[A-Z]/,
  PasswordLowercase: /[a-z]/,
  PasswordNumber: /\d/,
  PasswordSpecial: /[@$!%*?&]/,

  // User validation
  Name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/,
  Phone: /^\+?[1-9]\d{1,14}$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(?:[/\w .-]+)?\/?$/,
  HandoverDate: /^(Q[1-4]\s\d{4}|\d{4})$/,
} as const;
