import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";

@Injectable()
export class TransactionService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.listUsers(10);
  }
  async createUser(data: { email: string; username?: string; name?: string }) {
    return this.prisma.createUser(data);
  }

  async createTransaction(data: {
    amount: string;
    type: string;
    walletId: number;
  }) {
    return this.prisma.db.orm.public.Transaction.create({
      amount: data.amount,
      type: data.type,
      walletId: data.walletId,
    });
  }
}
