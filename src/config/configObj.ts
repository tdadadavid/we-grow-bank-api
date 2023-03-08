import * as process from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

export const config = Object.freeze({
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    name: process.env.dbName,
    password: process.env.dbPassword,
    host: process.env.dbHost,
    user: process.env.dbUsername,
  },
  saltHash: process.env.saltHash || 12,
  jwt: {
    access: {
      secret: process.env.accessTokenSecret,
      lifeSpan: process.env.accessTokenLifeSpan,
    },
    refreshToken: {
      secret: process.env.refreshTokenSecret,
      lifeSpan: process.env.refreshTokenLifeSpan,
    },
  },
  api: {
    exchange_rates_api_key: process.env.EXCHANGE_RATES_API_KEY,
    exchange_rates_api: process.env.EXCHANGE_RATES_API
  }
});
