export interface ApiResponse<T> {
  data: T;
  support?: Support;
}

export interface ApiListResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
  support?: Support;
}

export interface CollectionMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CollectionRecord<T> {
  id: string;
  collection_id: string;
  project_id: number;
  app_user_id: string | null;
  created_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  data: T;
}

export interface CollectionListResponse<T> {
  data: CollectionRecord<T>[];
  meta: CollectionMeta;
}

export interface CollectionRecordResponse<T> {
  data: CollectionRecord<T>;
}

export interface Support {
  url: string;
  text: string;
}

export interface ApiError {
  error: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';