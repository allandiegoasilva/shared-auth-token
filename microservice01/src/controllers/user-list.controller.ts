import { Controller, Get } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { UserDto } from "src/dtos/user.dto";
import { UserListService } from "src/services/user-list.service";

@Controller('users')
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @Get()
  async getUsers(): Promise<ReplyDto<UserDto[]>> {
    return this.userListService.execute();
  }
}