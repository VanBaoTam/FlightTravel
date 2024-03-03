export type TAirPort = {
  code: string;
  name: string;
  city: string;
};
export interface IRequestOptions {
  baseUrl?: string;
  path: string;
  method?: "get" | "post" | "put" | "patch" | "delete" | "options";
  params?: Record<string | symbol | number, any>;
  body?: any;
  headers?: Record<string | symbol | number, any>;
}
