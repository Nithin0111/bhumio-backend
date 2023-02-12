import { MiddlewareConsumer, Module } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { KnexModule as NestKnexModule } from 'nestjs-knex';
import { KnexDBConnectionService } from 'src/shared/orm/knex-connection.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dbconfig } from 'src/config/envconfig';
import { ReqestMiddleware } from 'src/shared/middlewares';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { HttpErrorFilter } from 'src/shared/filter/http-error.util';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { TableModule } from 'src/dbservices/tables/table.module';
import { usersModule } from 'src/features/users/users.module';
import { usersController } from 'src/features/users/users.controller';
import { usersService } from 'src/features/users/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/roles.guard';

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
    TableModule,
    usersModule,
    AuthModule,
  ],
  controllers: [AppController, usersController],
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
    usersService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqestMiddleware).forRoutes('*');
  }
}
