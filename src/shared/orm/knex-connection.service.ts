/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { KnexModuleOptions, KnexModuleOptionsFactory } from 'nestjs-knex';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KnexDBConnectionService implements KnexModuleOptionsFactory {
  @Inject(ConfigService)
  public config: ConfigService;

  createKnexModuleOptions(): KnexModuleOptions {
    return {
      config: {
        client: 'pg',
        connection: {
          database: 'bhumio',
          host: 'localhost',
          password: 'Momilvu@1209',
          port: 5432,
          user: 'postgres',
        },
        debug: false,
        migrations: {
          directory: __dirname + '../db/migrations',
        },

        seeds: {
          directory: __dirname + '../db/seeds',
        },
      },
    };
  }
}
