import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
//import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true, // Used for Logs
  });

  // app.useLogger(app.get(MyLoggerService)); // Custom Global Logs

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors(); // allows all origins

  app.setGlobalPrefix('api/v1'); // All routes will be prefixed with /api/v1

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
