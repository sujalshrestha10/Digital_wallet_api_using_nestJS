import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.listUsers(10);
  }
  async createUser(data: { email: string; username?: string; name?: string }) {
    return this.prisma.createUser(data);
  }
}
