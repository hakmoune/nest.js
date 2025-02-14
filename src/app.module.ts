import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';

// Module: Organize your code into cohesive blocks.
// src/app.module.ts: The root module that organizes your application.
@Module({
  imports: [UsersModule, DatabaseModule, EmployeeModule], // permet d'importer d'autres modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
