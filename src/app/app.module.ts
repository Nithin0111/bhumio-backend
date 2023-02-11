import { MiddlewareConsumer, Module } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { KnexModule as NestKnexModule } from 'nestjs-knex';
import { KnexDBConnectionService } from 'src/shared/orm/knex-connection.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dbconfig } from 'src/config/envconfig';
import { ReqestMiddleware } from 'src/shared/middlewares';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from 'src/shared/filter/http-error.util';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbconfig],
    }),
    NestKnexModule.forRootAsync(
      {
        useClass: KnexDBConnectionService,
      },
      KNEX_CONNECTION,
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqestMiddleware).forRoutes('*');
  }
}
