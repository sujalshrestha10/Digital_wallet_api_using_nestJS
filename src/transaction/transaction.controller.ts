import { Body, Controller, Inject, Post, Get } from "@nestjs/common";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {
  constructor(
    @Inject(TransactionService)
    private readonly transactionService: TransactionService,
  ) {}

  @Post()
  createTransaction(
    @Body() data: { amount: string; type: string; walletId: number },
  ) {
    return this.transactionService.createTransaction(data);
  }
}
