import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
