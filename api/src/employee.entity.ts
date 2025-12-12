import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ name: 'first_name', length: 100 })
  firstName: string;

  @Column({ name: 'middle_name', length: 100, nullable: true })
  middleName?: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ name: 'passport_series', length: 4, nullable: true })
  passportSeries?: string;

  @Column({ name: 'passport_number', length: 6, nullable: true })
  passportNumber?: string;

  @Column({ name: 'phone', length: 20, nullable: true })
  phone?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 100, nullable: true })
  department?: string;

  @Column({ length: 100, nullable: true })
  position?: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  salary?: number;

  @Column({ name: 'hire_date', type: 'date' })
  hireDate: Date;

  @Column({ name: 'is_fired', default: false })
  isFired: boolean;

  @Column({ name: 'fired_date', type: 'date', nullable: true })
  firedDate?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}