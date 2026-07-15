import { APIClient } from './apiClient';
import {
  ApiListResponse,
  ApiResponse,
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from '../types/index';

export class UserAPI {
  constructor(private readonly client: APIClient) {}

  async getUsers(page = 1): Promise<ApiListResponse<User>> {
    return this.client.get<ApiListResponse<User>>('/api/users', {
      page: String(page),
    });
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    return this.client.get<ApiResponse<User>>(`/api/users/${id}`);
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    return this.client.post<User>('/api/users', payload);
  }

  async updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
    return this.client.put<User>(`/api/users/${id}`, payload);
  }

  async patchUser(id: number, payload: UpdateUserPayload): Promise<User> {
    return this.client.patch<User>(`/api/users/${id}`, payload);
  }

  async deleteUser(id: number): Promise<number> {
    const response = await this.client.delete(`/api/users/${id}`);
    return response.status();
  }

  async getUserStatus(id: number): Promise<number> {
  return this.client.getStatusCode(`/api/users/${id}`);
}
}