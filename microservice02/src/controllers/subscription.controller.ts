import { Body, Controller, Get, Param, Post, Query, Req } from "@nestjs/common";

@Controller('subscriptions')
export class SubscriptionController {

  @Post()
  async getUserSubscriptions(@Query() query: any, @Body() body: any, @Req() req: Request, @Param() params: any): Promise<object> {
    //console.log(query.token);
    //console.log('BODY: ', body,  ' QUERY:', query);
    //console.log(req.headers);
   // console.log(req.body);
    //console.log(req.headers);


    console.log('QUERY: ', query);
    console.log('PARAMS: ', params);
    console.log('BODY: ', body);
    console.log('HEADERS: ', req.headers);
    //console.log(req);
    return {
      message: 'Request recebida no microserviço 02',
    }
  }
}