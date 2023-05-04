import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  create(dto: CreateProductDto): Promise<Product> {
    const data: Product = { ...dto };
    console.log(typeof data.price);
    return this.prisma.product.create({ data }).catch(handleError);
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findById(id);

    const data: Partial<Product> = { ...dto };
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.product.delete({ where: { id } });
  }

  async findById(id: string): Promise<Product> {
    const record = await this.prisma.product.findUnique({ where: { id } });
    console.log(record);
    if (!record) {
      throw new NotFoundException(`Registro com '${id}' não encontrado`);
    }
    return record;
  }
}
