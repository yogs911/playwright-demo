export interface User {
  id?: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type CreateUserPayload = Omit<User, 'id' | 'avatar'>;
export type UpdateUserPayload = Partial<CreateUserPayload>;