import { IsInt, IsString, Matches, IsNotEmpty } from "class-validator";

export class WalletWithdrawDto {
  @IsInt()
  walletId!: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+(\.\d+)?$/, {
    message: "Amount must be a positive number",
  })
  amount!: string;
}
