import express from 'express';
import { readFileSync } from 'fs';
import winston from 'winston';

// Setup Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [new winston.transports.Console()],
});

const app = express();
const PORT = process.env.PORT || 3000;

// Non-sensitive env vars
const greetingMessage = process.env.GREETING_MESSAGE || 'Hello from default!';
const logLevel = process.env.LOG_LEVEL || 'info';

// Sensitive env vars (masked)
const dbPassword = process.env.DB_PASSWORD ? '****' : 'NOT SET';
const apiKey = process.env.API_KEY ? '****' : 'NOT SET';

// Read config file from ConfigMap
let fileConfig = 'not found';
try {
  fileConfig = readFileSync('/etc/app/config/app.properties', 'utf8');
} catch (err) {
  logger.warn('Could not read app.properties file.');
}

// Read secret file from Secret
let secretFile = 'not found';
try {
  readFileSync('/etc/app/secrets/credentials.txt', 'utf8'); // Do not log content
  secretFile = '**** (loaded)';
} catch (err) {
  logger.warn('Could not read credentials.txt secret file.');
}

// Log configuration
logger.info('--- App Configuration ---');
logger.info(`GREETING_MESSAGE: ${greetingMessage}`);
logger.info(`LOG_LEVEL: ${logLevel}`);
logger.info(`DB_PASSWORD: ${dbPassword}`);
logger.info(`API_KEY: ${apiKey}`);
logger.info(`File Config: ${fileConfig.trim().slice(0, 50)}...`);
logger.info(`Secret File: ${secretFile}`);
logger.info('--------------------------');

app.get('/', (req, res) => {
  res.send(greetingMessage);
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
