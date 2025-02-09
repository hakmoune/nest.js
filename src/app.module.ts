import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// Module: Organize your code into cohesive blocks.
// src/app.module.ts: The root module that organizes your application.
@Module({
  imports: [UsersModule], // permet d'importer d'autres modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
