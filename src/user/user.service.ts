import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nickname: true,
    password: false,
    name: true,
    image: true,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException(`As senhas devem ser iguais`);
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user.create({ data }).catch(handleError);
  }
  findAll() {
    return this.prisma.user.findMany({ select: this.userSelect });
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!record) {
      throw new NotFoundException(`Registro de '${id} não encontrado`);
    }
    return record;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas devem ser iguais');
      }
    }
    delete dto.confirmPassword;

    const data: Partial<User> = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };
    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return await this.prisma.user.delete({ where: { id } });
  }
}
