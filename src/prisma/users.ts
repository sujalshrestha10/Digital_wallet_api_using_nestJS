import { db } from "./db.ts";

export { db };

export async function listUsers(limit = 10) {
  const users = await db.orm.public.User.select(
    "id",
    "email",
    "username",
    "name",
    "createdAt",
  )
    .limit(limit)
    .all();

  return users.map((user) => ({
    id: String(user.id),
    email: user.email,
    username: user.username ?? null,
    name: user.name ?? null,
    createdAt: user.createdAt,
  }));
}

export async function createUser(data: {
  email: string;
  username: string;
  name: string;
}) {
  return db.orm.public.User.create({
    email: data.email,
   username: data.username,
    name: data.name ?? null,
  });
}

export type StarterUser = Awaited<ReturnType<typeof listUsers>>[number];
