import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// @Injectable() : marks the class as a provider in the NestJS dependency injection system
// Means this class can be injected into other parts of your application.

// PrismaClient: This is the main client provided by Prisma to interact with your database.
// By extending "PrismaClient", DatabaseService inherits all of the methods provided by Prisma to perform database operations (like findMany, create, etc.).
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  // onModuleInit() lifecycle hook automatically connects to your database when the module is initialized
  async onModuleInit() {
    // $connect() is a method from PrismaClient that establishes a connection to the database.
    await this.$connect();
  }
}
