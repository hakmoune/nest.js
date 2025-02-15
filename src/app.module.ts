import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

// Module: Organize your code into cohesive blocks.
// src/app.module.ts: The root module that organizes your application.
@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeeModule,
    MyLoggerModule,
    ThrottlerModule.forRoot([
      {
        name: 'long',
        ttl: 60000, // 60000ms = 1min: time window
        limit: 100, // maximum 10 requests per IP within the window
      },
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
    ]),
  ], // permet d'importer d'autres modules
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
