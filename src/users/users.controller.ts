import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // base route /users
export class UsersController {
  // The UsersService is injected into the controller via the constructor.
  // NestJS takes care of creating an instance of UsersService and passing it to the controller.
  constructor(private readonly userService: UsersService) {} // Dependency Injection

  @Get() // GET /users || GET /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.userService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') // GET /users/:id (Dynamic Routes)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); // +id shorthand for converting a string to a number
  }

  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.userService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body()
    user: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.userService.update(+id, user);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.userService.delete(+id);
  }
}
