export enum Environment {
  Dev = 'dev',
  Staging = 'staging',
  Prod = 'prod',
}

export interface EnvironmentConfig {
  baseURL: string;
  apiBaseURL: string;
  env: Environment;
}
