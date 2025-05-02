import { Controller, Get, Param } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { SubscriptionDto } from "src/dtos/subscription.dto";
import { SubscriptionService } from "src/services/subscription-list.service";

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':userId')
  async getUserSubscriptions(@Param('userId') userId: number): Promise<ReplyDto<SubscriptionDto[]>> {
    return this.subscriptionService.execute(userId);
  }
}