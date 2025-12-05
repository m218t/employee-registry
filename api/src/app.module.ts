import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'app',
      password: 'secret',
      database: 'employees',
      entities: [Employee],
      synchronize: false,
    }),
    EmployeesModule,
  ],
})
export class AppModule { }