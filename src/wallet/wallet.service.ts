import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WalletsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async createWallet(userId: number) {
    return this.prisma.db.orm.public.Wallet.create({
      userId,
      balance: "0",
      currency: "NPR",
    });
  }
  async deposit(walletId: number, amount: string) {
    const wallet = await this.prisma.db.orm.public.Wallet.where({
      id: walletId,
    }).first();

    if (!wallet) {
      throw new Error("Wallet not found");
    }
    const newBalance = Number(wallet.balance) + Number(amount);

    await this.prisma.db.orm.public.Wallet.where({ id: walletId }).update({
      balance: String(newBalance),
    });
  }
  async getWallet() {
    return this.prisma.db.orm.public.Wallet.all();
  }
}
