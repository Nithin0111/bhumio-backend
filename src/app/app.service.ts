import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class AppService {
  @Inject(ConfigService)
  public config: ConfigService;

  getHello(): string {
    const databaseName: string = this.config.get('database');

    console.log({ databaseName });
    return 'Hello World!';
  }
}
