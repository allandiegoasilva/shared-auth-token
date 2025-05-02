import { Injectable } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { SubscriptionDto } from "src/dtos/subscription.dto";
import { StatusCode } from "src/enum/status-code";

@Injectable()
export class SubscriptionRepository {
  async getByUserId(userId: number): Promise<SubscriptionDto[]>{
    const request = await fetch(`http://microservice02:3001/subscriptions/${userId}`);

    if (!request.ok) {
      throw new Error('Failed to fetch subscriptions');
    }

    const data: ReplyDto<SubscriptionDto[]> = await request.json();

    if(data.statusCode !== StatusCode.SUCCESS) {
      throw new Error('Failed to fetch subscriptions');
    }

    return data.data;
  }
}