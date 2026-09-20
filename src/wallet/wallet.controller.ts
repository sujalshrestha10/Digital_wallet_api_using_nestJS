import { Body, Controller, Inject, Post, Get } from "@nestjs/common";
import { WalletsService } from "./wallet.service";
import { WalletPostDto } from "./wallet-post.dto";

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
  @Get()
  getWallets() {
    return this.walletsService.getWallet();
  }
 
}
