import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Número da mesa que está realizando o pedido',
    example: '1',
  })
  tableNumber: number;

  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'Lista com os IDs dos produtos que estão no pedido',
    type: [CreateOrderProductDto],
  })
  products: CreateOrderProductDto[];
}
