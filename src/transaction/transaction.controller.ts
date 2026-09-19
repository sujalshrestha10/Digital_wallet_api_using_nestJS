import { Body, Controller, Inject, Post, Get } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { Param } from "@nestjs/common";
import { CreateTransactionDto } from "./transcation.dto";

@Controller("transactions")
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  createTransaction(@Body() data: CreateTransactionDto) {
    return this.transactionService.createTransaction(data);
  }
  @Get()
  getTransactions() {
    return this.transactionService.getTransactions();
  }
  @Get(":walletId")
  getWalletTransactions(@Param("walletId") walletId: string) {
    return this.transactionService.findByWallet(Number(walletId));
  }
}
