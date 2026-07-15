import { APIRequestContext, APIResponse } from '@playwright/test';
import { HttpMethod } from '../types/api.types';

export class APIClient {
    private readonly apiKey: string;
    readonly projectId: string;

    constructor(private readonly request: APIRequestContext) {
        this.apiKey = process.env.API_KEY || '';
        this.projectId = process.env.PROJECT_ID || '';
    }

    private async sendRequest(
        method: HttpMethod,
        endpoint: string,
        options?: {
            data?: unknown;
            headers?: Record<string, string>;
            params?: Record<string, string>;
        }
    ): Promise<APIResponse> {
        const headers = {
            'x-api-key': this.apiKey,
            'X-Reqres-Env': 'prod',
            ...options?.headers,
        };

        const methodMap: Record<HttpMethod, () => Promise<APIResponse>> = {
            GET: () => this.request.get(endpoint, { params: options?.params, headers}),
            POST: () => this.request.post(endpoint, { data: options?.data, headers}),
            PUT: () => this.request.put(endpoint, { data: options?.data, headers}),
            PATCH: () => this.request.patch(endpoint, { data: options?.data, headers}),
            DELETE: () => this.request.delete(endpoint, { headers}),
        };

        return methodMap[method]();
    }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const response = await this.sendRequest('GET', endpoint, { params });
        return response.json() as Promise<T>;
    }

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await this.sendRequest('POST', endpoint, { data });
        return response.json() as Promise<T>;
    }

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await this.sendRequest('PUT', endpoint, { data });
        return response.json() as Promise<T>;
    }

    async patch<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await this.sendRequest('PATCH', endpoint, { data });
        return response.json() as Promise<T>;
    }

    async delete(endpoint: string): Promise<APIResponse> {
        return this.sendRequest('DELETE', endpoint);
    }

    async getStatusCode(endpoint: string): Promise<number> {
        const response = await this.sendRequest('GET', endpoint);
        return response.status();
    }
}