import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { usersDBQueries } from './users.queries';

@Injectable()
export class usersDBService {
  @Inject()
  private readonly usersDbQueries: usersDBQueries;

  public async addUser(user: userDTO): Promise<userDTO> {
    try {
      const result = await this.usersDbQueries.addUser(user);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async loginUser(email: string, password: string): Promise<userDTO> {
    try {
      const result = await this.usersDbQueries.loginUser(email, password);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUsers(): Promise<any> {
    return this.usersDbQueries.getUsers();
  }
}
