import { Injectable } from '@nestjs/common';
import { ReplyDto } from 'src/dtos/reply.dto';
import { SubscriptionDto } from 'src/dtos/subscription.dto';
import { StatusCode } from 'src/enum/status-code';
import { SubscriptionRepository } from 'src/repositories/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async execute(userId: number): Promise<ReplyDto<SubscriptionDto[]>> {
    const subscriptions = await this.subscriptionRepository.getByUserId(Number(userId));

    return {
      statusCode: StatusCode.SUCCESS,
      data: subscriptions,
    };
  }
}