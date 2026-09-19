import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
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

  async deposit(walletId: number, amount: string) {
    const wallet = await this.prisma.db.orm.public.Wallet.where({
      id: walletId,
    }).first();

    if (!wallet) {
      throw new NotFoundException("Wallet not found");
    }
    const newBalance = Number(wallet.balance) + Number(amount);

    await this.prisma.db.orm.public.Wallet.where({ id: walletId }).update({
      balance: String(newBalance),
    });
  }
  async getWallet() {
    return this.prisma.db.orm.public.Wallet.all();
  }
  async withdraw(walletId: number, amount: string) {
    const wallet = await this.prisma.db.orm.public.Wallet.where({
      id: walletId,
    }).first();

    if (!wallet) {
      throw new NotFoundException("Wallet not found");
    }
    if (Number(amount) > Number(wallet.balance)) {
      throw new BadRequestException("Insufficient balance");
    }
    const newBalance = Number(wallet.balance) - Number(amount);

    await this.prisma.db.orm.public.Wallet.where({ id: walletId }).update({
      balance: String(newBalance),
    });
  }
}
