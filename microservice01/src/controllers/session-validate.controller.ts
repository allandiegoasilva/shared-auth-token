import { Body, Controller, Post, Query, UnauthorizedException } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { UserDto } from "src/dtos/user.dto";

@Controller('session-validate')
export class SessionValidateController {

  @Post()
  async getAuthorization(): Promise<object> {
     
    // Validação básica de autorização
    const token = '1234567890';
    
    
    return {
      token: '1234567890',
    };

  }
}