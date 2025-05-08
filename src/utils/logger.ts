import { config } from '@config';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const getLogLevel = () => {
  return logLevels[config.logLevel as keyof typeof logLevels] || logLevels.info;
};

export const logger = {
  error: (message: string, meta?: any) => {
    if (getLogLevel() >= logLevels.error) {
      console.error(`[ERROR] ${message}`, meta || '');
    }
  },
  
  warn: (message: string, meta?: any) => {
    if (getLogLevel() >= logLevels.warn) {
      console.warn(`[WARN] ${message}`, meta || '');
    }
  },
  
  info: (message: string, meta?: any) => {
    if (getLogLevel() >= logLevels.info) {
      console.info(`[INFO] ${message}`, meta || '');
    }
  },
  
  debug: (message: string, meta?: any) => {
    if (getLogLevel() >= logLevels.debug) {
      console.debug(`[DEBUG] ${message}`, meta || '');
    }
  }
}; 