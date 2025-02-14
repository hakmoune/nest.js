import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() // Will skip the rate limit for all the routes of this model
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeeService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // Rate limiting is applied to this route.
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeeService.findAll(role);
  }

  // Overrid the rate limit 'short'
  // In case you dont have a name's rate limit, use { default: { ttl: 1000, limit: 1 }
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
