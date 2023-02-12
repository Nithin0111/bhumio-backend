import { Injectable } from '@nestjs/common';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { usersService } from 'src/features/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: usersService) {}

  async validateUser(email: string, password: string): Promise<userDTO | null> {
    const user = await this.usersService.loginUser(email, password);
    if (user) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }
}
