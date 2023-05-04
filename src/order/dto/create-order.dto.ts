import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUUID } from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário que está criando o pedido',
    example: '4c60d067-e43a-4e3e-90c4-ed886b1a5e0b',
  })
  userId: string;

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
