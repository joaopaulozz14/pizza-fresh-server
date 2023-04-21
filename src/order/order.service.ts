import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    const data: Prisma.OrderCreateInput = {
      user: {
        connect: { id: dto.userId },
      },
      table: {
        connect: { number: dto.tableNumber },
      },
      //Precisa ser entre parênteses porque está sem o return
      products: {
        connect: dto.products.map((productId) => ({
          id: productId,
        })),
      },
    };
    return this.prisma.order
      .create({
        data,
        select: {
          id: true,
          table: {
            select: {
              number: true,
            },
          },
          user: {
            select: {
              name: true,
            },
          },
          products: {
            select: {
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }
}
