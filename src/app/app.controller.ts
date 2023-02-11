import { Body, Controller, Get, Post } from '@nestjs/common';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
