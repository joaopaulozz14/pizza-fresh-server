import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    const data: User = { ...dto };
    return this.prisma.user.create({ data }).catch(this.handleError);
  }
  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    const data: Partial<User> = { ...dto };
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } });
  }

  handleError(error: Error) {
    console.log(error.message);
    throw new UnprocessableEntityException(error.message);
  }
  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Registro de '${id} não encontrado`);
    }
    return record;
  }
}
