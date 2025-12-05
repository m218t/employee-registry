export class CreateEmployeeDto {
    lastName: string;
    firstName: string;
    middleName?: string;
    birthDate: Date;
    passportSeries: string;
    passportNumber: string;
    phone?: string;
    email?: string;
    address?: string;
    department?: string;
    position?: string;
    salary?: number;
    hireDate: Date;
}