import { IsIn, IsInt, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateTransactionDto {
  @IsInt()
  walletId!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[1-9])\d+(\.\d+)?$/, {
    message: "Amount must be a positive number please enter a valid amount",
  })
  amount!: string;

  @IsIn(["deposit", "withdraw"])
  type!: string;
}
