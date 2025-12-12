import { 
  IsString, 
  IsDate, 
  IsEmail, 
  IsOptional, 
  IsNumber, 
  Min, 
  Matches, 
  Length,
  IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsString({ message: 'Фамилия обязательна' })
  @Length(1, 100, { message: 'Фамилия должна быть от 1 до 100 символов' })
  lastName: string;

  @IsString({ message: 'Имя обязательно' })
  @Length(1, 100, { message: 'Имя должно быть от 1 до 100 символов' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  @Length(1, 100, { message: 'Отчество должно быть до 100 символов' })
  middleName?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Некорректная дата рождения' })
  birthDate?: Date;

  @IsString({ message: 'Серия паспорта обязательна' })
  @Length(4, 4, { message: 'Серия паспорта должна содержать 4 цифры' })
  @Matches(/^\d{4}$/, { message: 'Серия паспорта: только цифры' })
  passportSeries: string;

  @IsString({ message: 'Номер паспорта обязателен' })
  @Length(6, 6, { message: 'Номер паспорта должен содержать 6 цифр' })
  @Matches(/^\d{6}$/, { message: 'Номер паспорта: только цифры' })
  passportNumber: string;

  @IsOptional()
  @IsString({ message: 'Телефон должен быть строкой' })
  @Matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, { 
    message: 'Телефон должен быть в формате: +7 (XXX) XXX-XX-XX' 
  })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Адрес должен быть строкой' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Отдел должен быть строкой' })
  department?: string;

  @IsOptional()
  @IsString({ message: 'Должность должна быть строкой' })
  position?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Зарплата должна быть числом' })
  @Min(0, { message: 'Зарплата не может быть отрицательной' })
  salary?: number;

  @Type(() => Date)
  @IsDate({ message: 'Некорректная дата приёма' })
  hireDate: Date;

  @IsOptional()
  @IsBoolean({ message: 'isFired должен быть boolean' })
  isFired?: boolean;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Некорректная дата увольнения' })
  firedDate?: Date;
}