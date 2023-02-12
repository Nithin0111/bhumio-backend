import { Controller, Get, Inject } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { Role } from 'src/shared/constants/role.enum';
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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return {
      sessionID: req.session.id,
      user: req.user,
    };
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('/getUsers')
  async getUsers(@Request() req): Promise<any> {
    const result = await this.usersService.getUsers();
    return result;
  }
}
