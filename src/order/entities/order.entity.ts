import { Product } from 'src/product/entities/product.entity';

export class Order {
  id?: string;
  user?: string;
  table?: string;
  products?: Product[];
  createdAt?: Date;
  updatedAt?: Date;
}
