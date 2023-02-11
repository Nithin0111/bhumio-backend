import { Module } from '@nestjs/common';
import { usersDBModule } from 'src/dbservices/tables/users/users.module';
import { usersController } from './users.controller';
import { usersService } from './users.service';

@Module({
  imports: [usersDBModule],
  controllers: [usersController],
  providers: [usersService],
  exports: [usersService],
})
export class usersModule {}
