import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name' })
  full_name: string;

  @Column({ name: 'birth_date', type: 'date' })
  birth_date: Date;

  @Column({ name: 'passport_number' })
  passport_number: string;

  @Column({ name: 'phone_number' })
  phone_number: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salary: number;

  @Column({ name: 'hire_date', type: 'date' })
  hire_date: Date;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}