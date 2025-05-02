import { Injectable } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { SubscriptionDto } from "src/dtos/subscription.dto";
import { StatusCode } from "src/enum/status-code";

@Injectable()
export class SubscriptionRepository {

  private readonly subscriptions: SubscriptionDto[] = [
    {
      id: 1,
      title: "Subscription 1",
      description: "Subscription 1 description",
      userId: 1,
    },
    {
      id: 2,
      title: "Subscription 2",
      description: "Subscription 2 description",
      userId: 2,
    },
  ];

  async getByUserId(userId: number): Promise<SubscriptionDto[]>{
    return this.subscriptions.filter(subscription => subscription.userId === userId);
  }
}