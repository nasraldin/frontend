import { isProd } from '~/utils/env';
import { logger } from '~/utils/logger';

import { validateSecurityConfig } from './security';

/**
 * Initialize security configurations and validations
 * This should be called early in the application lifecycle
 */
export function initializeSecurity() {
  try {
    // Validate security configuration
    validateSecurityConfig();

    // Additional security checks
    checkProductionSecurity();

    logger.info('Security initialization completed successfully');
  } catch (error) {
    logger.error({ error }, 'Security initialization failed');
    throw error;
  }
}

/**
 * Check production-specific security requirements
 */
function checkProductionSecurity() {
  if (isProd) {
    // Ensure debug is disabled in production
    if (env.AUTH_DEBUG === true) {
      logger.warn('AUTH_DEBUG is enabled in production - this is a security risk');
    }

    // Ensure HTTPS is used in production
    if (env.APP_URL && !env.APP_URL.startsWith('https://')) {
      logger.warn('Application URL is not using HTTPS in production');
    }

    // Check for weak secrets
    const authSecret = env.AUTH_SECRET;
    if (authSecret && authSecret.length < 32) {
      logger.warn('AUTH_SECRET is too short for production use');
    }

    // Ensure CSP is enabled
    if (env.STRICT_CSP !== true) {
      logger.warn('STRICT_CSP is not enabled in production');
    }
  }
}
