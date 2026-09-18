import { Body, Controller, Inject, Post, Get } from "@nestjs/common";
import { WalletsService } from "./wallet.service";

@Controller("wallets")
export class WalletsController {
  constructor(
    @Inject(WalletsService)
    private readonly walletsService: WalletsService,
  ) {}

  @Post()
  createWallet(@Body() data: { userId: number }) {
    return this.walletsService.createWallet(data.userId);
  }

  @Post("deposit")
  deposit(@Body() data: { walletId: number; amount: string }) {
    return this.walletsService.deposit(data.walletId, data.amount);
  }

  @Get()
  getWallets() {
    return this.walletsService.getWallet();
  }
  @Post("withdraw")
  withdraw(@Body() data: { walletId: number; amount: string }) {
    return this.walletsService.withdraw(data.walletId, data.amount);
  }
}
