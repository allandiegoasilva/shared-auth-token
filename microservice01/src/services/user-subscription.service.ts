import { Injectable } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { SubscriptionDto } from "src/dtos/subscription.dto";
import { UserDto } from "src/dtos/user.dto";
import { StatusCode } from "src/enum/status-code";
import { SubscriptionRepository } from "src/repositories/subscription.repository";
import { UserRepository } from "src/repositories/user.repository";


type Reply = UserDto & {
  subscriptions: SubscriptionDto[]
}

@Injectable()
export class UserSubscriptionService {
  constructor(
    private readonly userRepository: UserRepository, 
    private readonly subscriptionRepository: SubscriptionRepository
  ) {}

  async execute(userId: number): Promise<ReplyDto<Reply | undefined>> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return {
        statusCode: StatusCode.NOT_FOUND,
        data: undefined,
      };
    }

    const subscriptions = await this.subscriptionRepository.getByUserId(userId);
    
    return {
      statusCode: StatusCode.SUCCESS,
      data: {
        ...user,
        subscriptions: subscriptions,
      },
    };
  }
}