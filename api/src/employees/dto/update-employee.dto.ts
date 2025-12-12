import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsOptional, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsOptional()
  @IsBoolean({ message: 'isFired должен быть boolean' })
  isFired?: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Некорректная дата увольнения' })
  firedDate?: Date;
}