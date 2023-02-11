import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { InjectKnex } from 'nestjs-knex';
import { userDTO } from 'src/dbservices/entities/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectKnex(KNEX_CONNECTION) private readonly knex) {}

  @Inject(ConfigService)
  public config: ConfigService;

  getHello(): string {
    const databaseName: string = this.config.get('database');

    console.log({ databaseName });
    return 'Hello World!';
  }

  async addUser(user: userDTO): Promise<userDTO> {
    try {
      const result = await this.knex('users').insert(user).returning('*');

      console.log(result, 'result');

      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}
