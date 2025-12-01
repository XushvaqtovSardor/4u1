import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCnt = 1;
  create(dto: CreateUserDto) {
    const newUser: User = {
      id: this.idCnt++,
      ...dto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((t) => t.id == id);
    if (!user) {
      throw new NotFoundException(`${id} topilmadi`);
    }
    return user;
  }

  update(id: number, dto: UpdateUserDto) {
    const userId = this.users.findIndex((t) => t.id == id);
    if (userId === -1) {
      throw new NotFoundException(`${id} not found`);
    }
    this.users[userId] = {
      ...this.users[userId],
      ...dto,
    };
    return this.users[userId];
  }

  remove(id: number) {
    const userId = this.users.findIndex((x) => x.id == id);
    if (userId == -1) {
      throw new NotFoundException('not found');
    }
    this.users.splice(userId, 1);
    return { message: `user ${userId} o'chrildi` };
  }
}
