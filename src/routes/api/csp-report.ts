import { isDev } from '~/utils/env';
import { logger } from '~/utils/logger';

interface CSPReport {
  'csp-report': {
    'blocked-uri': string;
    'document-uri': string;
    'violated-directive': string;
    'original-policy': string;
    disposition: string;
    'source-file'?: string;
    'line-number'?: number;
    'column-number'?: number;
  };
}

// Validate CSP report structure
function validateCSPReport(data: unknown): data is CSPReport {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const report = data as Record<string, unknown>;
  if (!report['csp-report'] || typeof report['csp-report'] !== 'object') {
    return false;
  }

  const cspReport = report['csp-report'] as Record<string, unknown>;

  // Check required fields
  const requiredFields = [
    'blocked-uri',
    'document-uri',
    'violated-directive',
    'original-policy',
  ];
  for (const field of requiredFields) {
    if (typeof cspReport[field] !== 'string') {
      return false;
    }
  }

  return true;
}

async function logViolation(report: CSPReport) {
  try {
    // Safely extract environment variable with fallback
    const environment = import.meta.env.NODE_ENV || 'unknown';

    // You can implement your logging logic here
    // For example, logging to a service or database
    logger.info(
      {
        blockedUri: report['csp-report']['blocked-uri'],
        documentUri: report['csp-report']['document-uri'],
        violatedDirective: report['csp-report']['violated-directive'],
        originalPolicy: report['csp-report']['original-policy'],
        sourceFile: report['csp-report']['source-file'],
        lineNumber: report['csp-report']['line-number'],
        columnNumber: report['csp-report']['column-number'],
        timestamp: new Date().toISOString(),
        environment,
      },
      'CSP Violation Details:',
    );
  } catch (logError) {
    // Fallback logging if main logger fails - using logger.error as fallback
    try {
      logger.error({ error: logError }, 'Failed to log CSP violation:');
      logger.info(
        {
          blockedUri: report['csp-report']['blocked-uri'],
          violatedDirective: report['csp-report']['violated-directive'],
        },
        'CSP Violation (fallback):',
      );
    } catch {
      // Silent fallback if all logging fails
    }
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    // Get content type with fallback
    const contentType = request.headers.get('content-type') || '';

    // Accept both standard CSP report content types
    const validContentTypes = [
      'application/csp-report',
      'application/json',
      'application/reports+json',
    ];

    const isValidContentType = validContentTypes.some((type) =>
      contentType.toLowerCase().includes(type),
    );

    if (!isValidContentType) {
      return new Response(
        JSON.stringify({
          message:
            'Invalid content type. Expected application/csp-report or application/json',
        }),
        {
          status: 415,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
          },
        },
      );
    }

    // Check content length to prevent oversized requests
    const contentLength = request.headers.get('content-length');
    if (contentLength && Number.parseInt(contentLength) > 10 * 1024) {
      // 10KB limit
      return new Response(JSON.stringify({ message: 'Request too large' }), {
        status: 413,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        },
      });
    }

    let report: unknown;
    try {
      report = await request.json();
    } catch (parseError) {
      logger.error({ error: parseError }, 'Failed to parse CSP report JSON:');
      return new Response(JSON.stringify({ message: 'Invalid JSON format' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        },
      });
    }

    // Validate report structure
    if (!validateCSPReport(report)) {
      logger.warn({ report }, 'Invalid CSP report structure received:');
      return new Response(
        JSON.stringify({ message: 'Invalid CSP report format' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
          },
        },
      );
    }

    // Log the violation
    await logViolation(report);

    // Return 204 No Content
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
    });
  } catch (error) {
    // Enhanced error logging with more context
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      timestamp: new Date().toISOString(),
    };

    try {
      logger.error(errorDetails, 'Error processing CSP report:');
    } catch {
      // Silent fallback if logger fails to prevent further errors
    }

    // Return appropriate error response
    return new Response(
      JSON.stringify({
        message: 'Error processing report',
        error: isDev ? (error as Error).message : undefined,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
        },
      },
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// Helper function to return method not allowed response
function methodNotAllowed() {
  return new Response(JSON.stringify({ message: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// Prevent other HTTP methods
export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}
