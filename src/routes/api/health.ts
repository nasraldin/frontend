import { createRequestLogger } from '~/utils/logger';

export async function GET() {
  const logger = createRequestLogger('health-check');

  try {
    logger.info('Health check requested');

    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 100));

    logger.info('Health check completed successfully');

    return new Response(
      JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    logger.error({ error }, 'Health check failed');

    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Health check failed',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
