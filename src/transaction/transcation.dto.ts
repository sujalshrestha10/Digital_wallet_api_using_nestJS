import { IsIn, IsInt, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateTransactionDto {
  @IsInt()
  walletId!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+(\.\d+)?$/, {
    message: "Amount must be a positive number",
  })
  amount!: string;

  @IsIn(["deposit", "withdraw"])
  type!: string;
}
