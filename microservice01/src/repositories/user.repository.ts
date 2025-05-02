import { Injectable } from "@nestjs/common";
import { UserDto } from "src/dtos/user.dto";


@Injectable()
export class UserRepository {
  private users: UserDto[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
  ];

  async findAll(): Promise<UserDto[]> {
    return this.users;
  }

  async findById(id: number): Promise<UserDto | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
