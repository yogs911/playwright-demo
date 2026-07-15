import { APIClient } from './apiClient';
import {
  CollectionListResponse,
  CollectionRecord,
  CollectionRecordResponse,
  CreateProductPayload,
  UpdateProductPayload,
  Product,
} from '../types';

const BASE = '/api/collections/products/records';

export class ProductAPI {
    private readonly projectId: string;

  constructor(private readonly client: APIClient) {
    this.projectId = client.projectId;
  }

  private get params(): Record<string, string> {
    return { project_id: this.projectId };
  }

  async getProducts(): Promise<CollectionListResponse<Product>> {
    return this.client.get<CollectionListResponse<Product>>(BASE, this.params);
  }

  async getProductById(id: string): Promise<CollectionRecord<Product>> {
    return this.client.get<CollectionRecord<Product>>(`${BASE}/${id}`);
  }

  async createProduct(payload: CreateProductPayload): Promise<CollectionRecord<Product>> {
    const response = await this.client.post<CollectionRecordResponse<Product>>(`${BASE}?project_id=${this.projectId}`, { data: payload });
    return response.data;
  }

  async updateProduct(id: string, payload: CreateProductPayload): Promise<CollectionRecord<Product>> {
    const response = await this.client.put<CollectionRecordResponse<Product>>(`${BASE}/${id}?project_id=${this.projectId}`, { data: payload });
    return response.data;
  }

  async deleteProduct(id: string): Promise<number> {
    const response = await this.client.delete(`${BASE}/${id}?project_id=${this.projectId}`);
    return response.status();
  }

  async getProductStatus(id: string): Promise<number> {
    return this.client.getStatusCode(`${BASE}/${id}?project_id=${this.projectId}`);
  }
}