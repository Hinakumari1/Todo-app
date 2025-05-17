import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as morgan from 'morgan';
import { JsonLogger } from './json-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  logger: new JsonLogger(),
});

  const logStream = fs.createWriteStream('/logs/app.log', { flags: 'a' });
 app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: parseInt(tokens.status(req, res) || '0'),
      response_time_ms: parseFloat(tokens['response-time'](req, res) || '0'),
      remote_addr: tokens['remote-addr'](req, res),
      user_agent: tokens['user-agent'](req, res),
    });
  }, { stream: logStream })
);

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
