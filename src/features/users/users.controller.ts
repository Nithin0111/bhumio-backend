import { Controller, Get, Inject } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { usersService } from './users.service';

@Controller('user')
export class usersController {
  @Inject()
  private readonly usersService: usersService;

  @Post('/addUser')
  public async addUser(@Body() user: userDTO): Promise<userDTO> {
    const result = await this.usersService.addUser(user);
    return result;
  }

  @Post('/login')
  public async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<userDTO> {
    const result = await this.usersService.loginUser(email, password);
    return result;
  }

  @Get('/getUsers')
  public async getUsers(): Promise<any> {
    return this.usersService.getUsers();
  }
}
