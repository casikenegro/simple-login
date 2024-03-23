import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/rol.enum';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  lastname: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  username: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  role: Role;
  constructor(payload: Partial<CreateUserDto>) {
    Object.assign(this, payload);
    if (this.role == undefined || null) {
      this.role = Role.ADMIN;
    }
  }
}
