import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTransactionDto } from "./transcation.dto";
@Injectable()
export class TransactionService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async createTransaction(data: CreateTransactionDto) {
    const wallet = await this.prisma.db.orm.public.Wallet.where({
      id: data.walletId,
    }).first();

    if (!wallet) {
      throw new NotFoundException("Wallet not found");
    }

    const amount = Number(data.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException("Amount must be a positive number");
    }

    let newBalance = Number(wallet.balance);

    if (data.type === "deposit") {
      newBalance += amount;
    } else if (data.type === "withdraw") {
      if (amount > newBalance) {
        throw new BadRequestException("Insufficient balance");
      }
      newBalance -= amount;
    } else {
      throw new BadRequestException(
        "Transaction type must be deposit or withdraw",
      );
    }

    await this.prisma.db.orm.public.Wallet.where({
      id: data.walletId,
    }).update({
      balance: String(newBalance),
    });

    return this.prisma.db.orm.public.Transaction.create({
      amount: data.amount,
      type: data.type,
      walletId: data.walletId,
    });
  }

  async findByWallet(walletId: number) {
    return this.prisma.db.orm.public.Transaction.where({
      walletId,
    }).all();
  }

  async getTransactions() {
    return this.prisma.db.orm.public.Transaction.all();
  }
}
