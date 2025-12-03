import { Controller, Get, Post, Put, Patch, Param, Body } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from '../employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Get()
  getAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.employeesService.findOne(id);
  }

  @Post()
  create(@Body() employee: Partial<Employee>) {
    return this.employeesService.create(employee);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Employee>) {
    return this.employeesService.update(id, data);
  }

  @Patch(':id/fire')
  fire(@Param('id') id: number) {
    return this.employeesService.fire(id);
  }
}
