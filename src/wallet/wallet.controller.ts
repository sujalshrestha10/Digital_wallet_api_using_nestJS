import { Body, Controller, Inject, Post, Get } from "@nestjs/common";
import { WalletsService } from "./wallet.service";
import { WalletPostDto } from "./wallet-post.dto";
import type { WalletDepositDto } from "./wallet-deposit.dto";
import type { WalletWithdrawDto } from "./wallet-withdraw.dto";
@Controller("wallets")
export class WalletsController {
  constructor(
    @Inject(WalletsService)
    private readonly walletsService: WalletsService,
  ) {}

  @Post()
  createWallet(@Body() data: WalletPostDto) {
    return this.walletsService.createWallet(data.userId);
  }

  @Post("deposit")
  deposit(@Body() data: WalletDepositDto) {
    return this.walletsService.deposit(data.walletId, data.amount);
  }

  @Get()
  getWallets() {
    return this.walletsService.getWallet();
  }
  @Post("withdraw")
  withdraw(@Body() data: WalletWithdrawDto) {
    return this.walletsService.withdraw(data.walletId, data.amount);
  }
}
