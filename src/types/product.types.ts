export interface Product {
  id?: string;
  name: string;
  price: number;
  category?: string;
  in_stock?: boolean;
}

export type CreateProductPayload = Omit<Product, 'id'>;
export type UpdateProductPayload = Partial<CreateProductPayload>;