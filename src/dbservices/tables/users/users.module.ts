import { Module } from '@nestjs/common';
import { usersDBQueries } from './users.queries';
import { usersDBService } from './users.service';

@Module({
  imports: [],
  providers: [usersDBQueries, usersDBService],
  exports: [usersDBQueries, usersDBService],
})
export class usersDBModule {}
