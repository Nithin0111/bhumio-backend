import { Module } from '@nestjs/common';
import { usersDBQueries } from './users/users.queries';
import { usersDBService } from './users/users.service';

const modules = [usersDBQueries, usersDBService];

@Module({
  providers: [...modules],
  exports: [...modules],
})
export class TableModule {}
