import { Injectable } from '@nestjs/common';

// Providers (Services): Encapsulate business logic and can be injected into controllers or other providers.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
