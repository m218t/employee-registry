import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Employee } from '../employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) { }

  findAll(department?: string, position?: string) {
    const where: any = {};

    if (department) {
      where.department = department;
    }

    if (position) {
      where.position = position;
    }

    return this.employeesRepository.find({ where });
  }

  searchByName(name: string) {
    if (!name || name.trim() === '') {
      return this.employeesRepository.find();
    }

    return this.employeesRepository
      .createQueryBuilder('employee')
      .where(
        'CONCAT(employee.last_name, \' \', employee.first_name, \' \', COALESCE(employee.middle_name, \'\')) ILIKE :name',
        { name: `%${name}%` }
      )
      .getMany();
  }

  findOne(id: number) {
    return this.employeesRepository.findOne({ where: { id } });
  }

  create(employeeData: any) {
    const employee = this.employeesRepository.create({
      ...employeeData,
      isFired: false, // camelCase!
    });
    return this.employeesRepository.save(employee);
  }

  async update(id: number, data: any) {
    const employee = await this.findOne(id);

    if (!employee) {
      throw new NotFoundException('Сотрудник не найден');
    }

    // Используем isFired (camelCase)
    if (employee.isFired) {
      throw new BadRequestException('Нельзя редактировать уволенного сотрудника');
    }

    Object.assign(employee, data);
    return this.employeesRepository.save(employee);
  }

  async dismiss(id: number) {
    const employee = await this.employeesRepository.findOne({ where: { id } });

    if (!employee) {
      throw new NotFoundException('Сотрудник не найден');
    }

    if (employee.isFired) {
      throw new BadRequestException('Сотрудник уже уволен');
    }

    employee.isFired = true;
    employee.firedDate = new Date();
    return this.employeesRepository.save(employee);
  }

  async getDepartments(): Promise<string[]> {
    const result = await this.employeesRepository
      .createQueryBuilder('employee')
      .select('DISTINCT department', 'department')
      .where('is_fired = false')
      .andWhere('department IS NOT NULL')
      .orderBy('department')
      .getRawMany();

    return result.map(row => row.department).filter(Boolean);
  }

  async getPositions(): Promise<string[]> {
    const result = await this.employeesRepository
      .createQueryBuilder('employee')
      .select('DISTINCT position', 'position')
      .where('is_fired = false')
      .andWhere('position IS NOT NULL')
      .orderBy('position')
      .getRawMany();

    return result.map(row => row.position).filter(Boolean);
  }
}