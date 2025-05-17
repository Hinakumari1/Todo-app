import { LoggerService } from '@nestjs/common';

export class JsonLogger implements LoggerService {
  log(message: any, context?: string) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      context: context || null,
    }));
  }

  error(message: any, trace?: string, context?: string) {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      trace: trace || null,
      context: context || null,
    }));
  }

  warn(message: any, context?: string) {
    console.warn(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      context: context || null,
    }));
  }
}
