import { IsInt, IsNotEmpty, IsString, Matches } from "class-validator";

export class WalletDepositDto {
  @IsInt()
  walletId!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+(\.\d+)?$/, {
    message: "Amount must be a positive number",
  })
  amount!: string;
}
