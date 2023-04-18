import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTableDto } from './dto/uptade-table.dto';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };
    //return this.prisma.table.create({ data: table });
    return this.prisma.table.create({ data }).catch(handleError);
  }

  async findOne(id: string): Promise<Table> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateTableDto) {
    await this.findById(id);

    const data: Partial<Table> = { ...dto };
    return this.prisma.table.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.table.delete({ where: { id } });
  }

  async findById(id: string): Promise<Table> {
    const record = await this.prisma.table.findUnique({ where: { id } });
    console.log(record);
    if (!record) {
      throw new NotFoundException(`Registro com '${id}' não encontrado`);
    }
    return record;
  }
}
