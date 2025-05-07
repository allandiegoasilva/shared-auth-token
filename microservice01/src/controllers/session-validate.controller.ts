import { Controller, Post } from "@nestjs/common";
import { ReplyDto } from "src/dtos/reply.dto";
import { UserDto } from "src/dtos/user.dto";

@Controller('session-validate')
export class SessionValidateController {

  @Post()
  async getAuthorization(): Promise<object> {
     
    console.log('ACESSOU A ROTA DE OBTER USUÁRIOS');
    return {
      accessToken: '1234567890',
    }
  }
}