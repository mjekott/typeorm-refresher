import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  ) {}

  async seed() {
    const ceo = await this.employeeRepo.create({ name: 'Mr.Ceo' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'email@email.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo);

    const manaager = this.employeeRepo.create({
      name: 'Mr bean',
      manager: ceo,
    });
    const task1 = this.taskRepo.create({ name: 'Hire people' });
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({ name: 'Present to Ceo' });
    await this.taskRepo.save(task2);
    manaager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manaager.meetings = [meeting1];

    this.employeeRepo.save(manaager);
  }

  getEmployeeById(id: number) {
    /*    this.employeeRepo.findOne(id, {
      relations: [
        'manager',
        'directReports',
        'tasks',
        'contactInfo',
        'meetings',
      ],
    }); */

    return this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .where('empoyee.id = :employeeId', { employeeId: id })
      .getOne();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
