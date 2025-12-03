import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) { }

  findAll() {
    return this.employeeRepo.find();
  }

  findOne(id: number) {
    return this.employeeRepo.findOneBy({ id });
  }

  create(employee: Partial<Employee>) {
    return this.employeeRepo.save(employee);
  }

  update(id: number, data: Partial<Employee>) {
    return this.employeeRepo.update(id, data);
  }

  fire(id: number) {
    return this.employeeRepo.update(id, { is_fired: true });
  }
}
