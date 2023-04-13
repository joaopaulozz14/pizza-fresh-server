import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { Table } from './entities/table.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.table.findMany();
  }

  create(dto: CreateTableDto) {
    const data: Table = { ...dto };
    //return this.prisma.table.create({ data: table });
    return this.prisma.table.create({ data });
  }
}
