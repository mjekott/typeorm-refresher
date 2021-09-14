import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ContactInfo } from './contact-info.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;
}
