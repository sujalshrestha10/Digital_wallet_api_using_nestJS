import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name!: string;
}
