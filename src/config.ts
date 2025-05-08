interface Config {
  port: number;
  nodeEnv: string;
  logLevel: string;
  jwtSecret: string;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-development-key',
}; 