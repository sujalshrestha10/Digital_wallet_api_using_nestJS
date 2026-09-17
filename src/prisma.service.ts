import { Injectable } from "@nestjs/common";
import { db, listUsers, createUser, type StarterUser } from "./prisma/users";

@Injectable()
export class PrismaService {
  readonly db = db;

  listUsers(limit = 10): Promise<StarterUser[]> {
    return listUsers(limit);
  }
  createUser(data: { email: string; username?: string; name?: string }) {
    return createUser(data);
  }
}
