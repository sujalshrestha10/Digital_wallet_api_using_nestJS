import { IsInt, IsPositive } from "class-validator";

export class WalletPostDto {
  @IsInt()
  @IsPositive()
  userId!: number;
}
