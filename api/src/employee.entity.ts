import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column()
  birth_date: Date;

  @Column()
  passport_series: string;

  @Column()
  passport_number: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column('numeric')
  salary: number;

  @Column()
  hire_date: Date;

  @Column({ default: false })
  is_fired: boolean;

  @Column({ nullable: true })
  fired_date: Date;
}
