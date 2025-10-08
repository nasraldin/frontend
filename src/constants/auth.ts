/**
 * Enum representing various authentication schemes.
 *
 * Bearer | Token | ApiKey
 */
export enum AuthSchemes {
  /**
   * The Bearer authentication scheme.
   * This scheme is used when the token in the `Authorization` header is a Bearer token.
   */
  Bearer = 'Bearer',

  /**
   * The Token authentication scheme.
   * This scheme is used when the token in the `Authorization` header is a token.
   */
  Token = 'token',

  /**
   * The API Key authentication scheme.
   * This scheme is used when the token in the `Authorization` header is an API Key.
   */
  ApiKey = 'ApiKey',
}

/**
 * Enum representing different authentication providers.
 *
 * keycloak | credentials
 */
export enum AuthProviderType {
  /**
   * Keycloak authentication provider.
   * This provider is used for authentication with Keycloak.
   */
  Keycloak = 'keycloak',

  /**
   * Credentials authentication provider.
   * This provider is used for authentication with credentials.
   * (username/email, password)
   */
  Credential = 'credentials',
}

/**
 * Enum representing different authentication status.
 *
 * unauthenticated | authenticated | loading
 */
export enum SessionStatus {
  Authenticated = 'authenticated',
  UnAuthenticated = 'unauthenticated',
  Loading = 'loading',
}

export enum PasswordLength {
  Min = 8,
  Max = 64,
}

export const MAX_SIGN_IN_FAILED_ATTEMPTS = 4;
