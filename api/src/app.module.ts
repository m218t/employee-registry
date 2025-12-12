import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'app',
      password: process.env.DB_PASSWORD || 'secret',
      database: process.env.DB_DATABASE || 'employees',
      entities: [Employee],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    EmployeesModule,
  ],
})
export class AppModule { }