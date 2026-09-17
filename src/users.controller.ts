import { Controller, Get, Inject, Post, Body } from "@nestjs/common";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(
    @Body()
    data: {
      email: string;
      username?: string;
      name?: string;
    },
  ) {
    return this.usersService.createUser(data);
  }
}
