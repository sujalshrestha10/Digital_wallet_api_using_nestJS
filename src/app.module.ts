import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { WalletsController } from "./wallet/wallet.controller";
import { WalletsService } from "./wallet/wallet.service";
import { TransactionController } from "./transaction/transaction.controller";
import { TransactionService } from "./transaction/transaction.service";

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    WalletsController,
    TransactionController,
  ],
  providers: [PrismaService, UsersService, WalletsService, TransactionService],
})
export class AppModule {}
