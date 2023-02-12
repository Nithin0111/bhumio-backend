import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { InjectKnex } from 'nestjs-knex';
import * as bcrypt from 'bcrypt';
import { userDTO } from 'src/dbservices/entities/user.entity';
import { tableNames } from 'src/shared/constants/dbtables';
import { checkValidEmail } from 'src/shared/utils/checkValidEmail';
import { Role } from 'src/shared/constants/role.enum';

@Injectable()
export class usersDBQueries {
  constructor(@InjectKnex(KNEX_CONNECTION) private readonly knex) {}

  /*
   * Add a new user to the database
   * @param user: userDTO
   * @returns userDTO
   * @throws HttpException
   */
  public async addUser(user: userDTO): Promise<userDTO> {
    try {
      const { name, email, password, role } = user;

      if (!name || !email || !password || !role) {
        throw new HttpException(
          'Missing required fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isValidRole = Object.values(Role).includes(role as any);
      if (!isValidRole) {
        throw new HttpException('Invalid role', HttpStatus.BAD_REQUEST);
      }

      const isValidEmail = checkValidEmail(email);
      if (!isValidEmail) {
        throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
      }

      const existingUserRes = await this.knex(tableNames.USERS)
        .select('*')
        .where({ email });

      if (existingUserRes.length > 0) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUserRes = await this.knex(tableNames.USERS)
        .insert({ name, email, password: hashedPassword, role })
        .returning('*');

      if (newUserRes.length > 0) {
        return newUserRes;
      } else {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*
   * Login a user
   * @param user: userDTO
   * @returns userDTO
   * @throws HttpException
   */
  public async loginUser(email, password): Promise<userDTO> {
    try {
      if (!email || !password) {
        throw new HttpException(
          'Missing required fields',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isValidEmail = checkValidEmail(email);
      if (!isValidEmail) {
        throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
      }

      const existingUserRes = await this.knex(tableNames.USERS)
        .select('*')
        .where({ email });

      if (existingUserRes.length > 0) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUserRes[0].password,
        );

        if (isPasswordCorrect) {
          delete existingUserRes[0].password;
          return existingUserRes;
        } else {
          throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUsers(): Promise<any> {
    return this.knex('users').select('*');
  }
}
