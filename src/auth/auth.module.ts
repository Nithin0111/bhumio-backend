import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { usersModule } from 'src/features/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    usersModule,
    PassportModule.register({ defaultStrategy: 'local', session: true }),
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
