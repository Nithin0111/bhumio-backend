import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

// session imports
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  // use config service to get the port
  const configService = app.get(ConfigService);
  const port = Number(configService.get('port'));
  const sessionSecret = configService.get('sessionSecret');

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port, () => {
    Logger.log(`Server started on port ${port}`);
  });
}
bootstrap();
