import { Injectable } from '@nestjs/common';
import { ReplyDto } from 'src/dtos/reply.dto';
import { UserDto } from 'src/dtos/user.dto';
import { StatusCode } from 'src/enum/status-code';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserListService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<ReplyDto<UserDto[]>> {
    const users = await this.userRepository.findAll();

    return {
      statusCode: StatusCode.SUCCESS,
      data: users,
    };
  }
}