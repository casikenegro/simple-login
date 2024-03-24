import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'lastname', 'email', 'password', 'role'],
    });
  }

  findAll() {
    return this.userRepository.find({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password != null || undefined) {
      updateUserDto.password = await bcryptjs.hash(updateUserDto.password, 10);
    }

    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.update(
      { id },
      {
        deletedAt: new Date().toISOString(),
      },
    );
  }
}
