import { Controller, Get, Post, Put, Patch, Param, Body, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Get()
  getAll(@Query('department') department?: string, @Query('position') position?: string) {
    return this.employeesService.findAll(department, position);
  }

  @Get('search')
  search(@Query('name') name: string) {
    return this.employeesService.searchByName(name);
  }

  @Get('departments')
  getDepartments() {
    return this.employeesService.getDepartments();
  }

  @Get('positions')
  getPositions() {
    return this.employeesService.getPositions();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.employeesService.findOne(id);
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Patch(':id/dismiss')
  dismiss(@Param('id') id: number) {
    return this.employeesService.dismiss(id);
  }
}