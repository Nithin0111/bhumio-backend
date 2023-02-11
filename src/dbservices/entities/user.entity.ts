import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class userDTO {
  @IsNotEmpty()
  name: string;
  email: string;
  password: string;
  role: string;
  @Column({ default: 'active' })
  status: string;
}
