import { siteConfig } from '~/config';
import {
  AuthSchemes,
  ContentType,
  HttpHeaderName,
  HttpRequestMethodName,
} from '~/constants';
import { env } from '~/env';
import { createRequestLogger } from '~/utils/logger';

export async function GET() {
  const logger = createRequestLogger('health-check');
  logger.info('Health check requested');

  try {
    const commitsCheckUrl = env.COMMITS_CHECK_URL;
    const commitsCheckAccessToken = env.COMMITS_CHECK_ACCESS_TOKEN;

    let lastCommit = null;

    // Only fetch commits if URL and token are available
    if (commitsCheckUrl && commitsCheckAccessToken) {
      const fetchCommits = await fetch(commitsCheckUrl, {
        method: HttpRequestMethodName.GET,
        headers: {
          [HttpHeaderName.Authorization]: `${AuthSchemes.Token} ${commitsCheckAccessToken}`,
          [HttpHeaderName.ContentType]: ContentType.JSON,
        },
      });

      lastCommit = await fetchCommits.json();
      lastCommit = {
        author: lastCommit?.commit?.author?.name,
        date: lastCommit?.commit?.author?.date,
        message: lastCommit?.commit?.message,
        commitSha: lastCommit?.sha,
      };
    } else {
      logger.info('Commit check skipped - environment variables not configured');
    }

    logger.info('Health check completed successfully');

    return new Response(
      JSON.stringify({
        app: siteConfig.appName,
        version: siteConfig.appVersion,
        environment: env.NODE_ENV,
        status: '✅ Healthy',
        isHealthy: true,
        timestamp: new Date(Date.now()),
        lastCommit,
      }),
      {
        headers: {
          [HttpHeaderName.ContentType]: ContentType.JSON,
        },
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
