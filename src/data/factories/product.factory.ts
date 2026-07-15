import { faker } from '@faker-js/faker';
import { CreateProductPayload, UpdateProductPayload } from '../../types';

export class ProductFactory {
  static create(overrides?: Partial<CreateProductPayload>): CreateProductPayload {
    return {
      name: faker.commerce.productName(),
      price: Number.parseFloat(faker.commerce.price()),
      category: faker.commerce.department(),
      in_stock: faker.datatype.boolean(),
      ...overrides,
    };
  }

  static createMany(count: number, overrides?: Partial<CreateProductPayload>): CreateProductPayload[] {
    return Array.from({ length: count }, () => ProductFactory.create(overrides));
  }

  static createForPatch(overrides: Partial<UpdateProductPayload>): UpdateProductPayload {
    return { ...overrides };
  }
}