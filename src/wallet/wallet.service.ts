import {
  Inject,
  Injectable,
  BadRequestException,
 
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WalletsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async createWallet(userId: number) {
    try {
      await this.prisma.db.orm.public.Wallet.create({
        userId,
        balance: "0",
        currency: "NPR",
      });
    } catch (error) {
      throw new BadRequestException(
        "User already has a wallet or invalid userId",
      );
    }
  }

  async getWallet() {
    return this.prisma.db.orm.public.Wallet.all();
  }
}
