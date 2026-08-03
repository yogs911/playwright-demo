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

        const params = {
            project_id: this.projectId,
            ...options?.params,
        };

        const methodMap: Record<HttpMethod, () => Promise<APIResponse>> = {
            GET: () => this.request.get(endpoint, { params, headers }),
            POST: () => this.request.post(endpoint, { params, headers, data: options?.data }),
            PUT: () => this.request.put(endpoint, { params, headers, data: options?.data }),
            PATCH: () => this.request.patch(endpoint, { params, headers, data: options?.data }),
            DELETE: () => this.request.delete(endpoint, { params, headers }),
        };


        return methodMap[method]();
    }

    private async parseResponse<T>(response: APIResponse): Promise<T> {
        const contentType = response.headers()['content-type'] || '';

        if (!contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(
                `Expected JSON but got ${contentType}. Status: ${response.status()}. Body: ${text.slice(0, 200)}`
            );
        }

        if (!response.ok()) {
            const json = await response.json();
            throw new Error(
                `Request failed with status ${response.status()}: ${JSON.stringify(json)}`
            );
        }

        return response.json() as Promise<T>;
    }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const response = await this.sendRequest('GET', endpoint, { params });
        return this.parseResponse<T>(response);
    }

    async post<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await this.sendRequest('POST', endpoint, { data });
        return this.parseResponse<T>(response);
    }

    async put<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await this.sendRequest('PUT', endpoint, { data });
        return this.parseResponse<T>(response);
    }

    async patch<T>(endpoint: string, data: unknown): Promise<T> {
        const response = await this.sendRequest('PATCH', endpoint, { data });
        return this.parseResponse<T>(response);
    }

    async delete(endpoint: string): Promise<APIResponse> {
        return this.sendRequest('DELETE', endpoint);
    }

    async getStatusCode(endpoint: string): Promise<number> {
        const response = await this.sendRequest('GET', endpoint);
        return response.status();
    }
}