import { Injectable, Inject } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { usersDBService } from 'src/dbservices/tables/users/users.service';

@Injectable()
export class usersService {
  @Inject()
  private readonly usersDBService: usersDBService;

  public async addUser(user: userDTO): Promise<userDTO> {
    try {
      const result = await this.usersDBService.addUser(user);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async loginUser(email: string, password: string): Promise<userDTO> {
    try {
      const result = await this.usersDBService.loginUser(email, password);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUsers(): Promise<any> {
    return this.usersDBService.getUsers();
  }
}
