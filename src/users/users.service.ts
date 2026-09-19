import { Inject, Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./create-user.dto";

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.listUsers(10);
  }
  async createUser(data: CreateUserDto) {
    return this.prisma.createUser(data);
  }
}
