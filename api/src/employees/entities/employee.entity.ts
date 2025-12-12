import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'last_name', length: 100 })
    last_name: string;

    @Column({ name: 'first_name', length: 100 })
    first_name: string;

    @Column({ name: 'middle_name', length: 100, nullable: true })
    middle_name: string;

    @Column({ name: 'birth_date', type: 'date' })
    birth_date: Date;

    @Column({ name: 'passport_series', length: 20 })
    passport_series: string;

    @Column({ name: 'passport_number', length: 20 })
    passport_number: string;

    @Column({ name: 'phone', length: 30, nullable: true })
    phone: string;

    @Column({ length: 255, nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ length: 100, nullable: true })
    department: string;

    @Column({ length: 100, nullable: true })
    position: string;

    @Column('numeric', { precision: 12, scale: 2, nullable: true })
    salary: number;

    @Column({ name: 'hire_date', type: 'date' })
    hire_date: Date;


    @Column({ name: 'is_fired', default: false })
    is_fired: boolean;

    @Column({ name: 'fired_date', type: 'date', nullable: true })
    fired_date: Date;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;


    get fullName(): string {
        return `${this.last_name} ${this.first_name}${this.middle_name ? ' ' + this.middle_name : ''}`.trim();
    }


    get passportFull(): string {
        return `${this.passport_series} ${this.passport_number}`.trim();
    }
}