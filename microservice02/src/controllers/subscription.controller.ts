import { Controller, Get, Param, Req } from "@nestjs/common";

@Controller('subscriptions')
export class SubscriptionController {

  @Get()
  async getUserSubscriptions(@Req() req: Request): Promise<object> {
    console.log(req.headers);

    return {
      message: 'Request recebida no microserviço 02',
    }
  }
}