import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  /*   @IsString()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email?: string; */

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(60)
  password: string;
}
