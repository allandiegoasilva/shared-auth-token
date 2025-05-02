import { Controller, Get, Param } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { SubscriptionDto } from "src/dtos/subscription.dto";
import { UserSubscriptionService } from "src/services/user-subscription.service";

@Controller('users')
export class UserSubscriptionController {
  constructor(private readonly userSubscriptionService: UserSubscriptionService) {}

  @Get(':userId')
  async getUserSubscriptions(@Param('userId') userId: number): Promise<ReplyDto<any>> {
    return this.userSubscriptionService.execute(Number(userId));
  }
}