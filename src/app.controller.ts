import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    //this.appService.seed();
    return this.appService.getEmployeeById(2);

    //usign query builder
  }
}
