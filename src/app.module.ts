import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { WalletsController } from "./wallet/wallet.controller";
import { WalletsService } from "./wallet/wallet.service";

@Module({
  imports: [],
  controllers: [AppController, UsersController, WalletsController],
  providers: [PrismaService, UsersService, WalletsService],
})
export class AppModule {}
