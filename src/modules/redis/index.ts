import Redis, { RedisOptions } from 'ioredis';

import { settings } from '@/modules/common';

const DEFAULT_REDIS_OPTIONS: RedisOptions = {
  host: settings.redis.host,
  port: settings.redis.port,
  // eslint-disable-next-line no-magic-numbers -- This is disabled to allow retry attempts
  retryStrategy: (opts: any) => Math.max(opts.attempt * 100, 3000), // opts.attempt * 100 -- This computes a delay based on the number of attempts. The delay increases with each retry. 3000 -- This sets a minimum delay of 3000ms (or 3 seconds).
};

const redis = new Redis(DEFAULT_REDIS_OPTIONS);

export default redis;
