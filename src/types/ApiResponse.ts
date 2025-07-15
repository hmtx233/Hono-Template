import { PaginationResult } from './Pagination';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string | string[];
  message?: string;
};

// 分页响应类型
export type PaginatedApiResponse<T = unknown> = {
  success: boolean;
  data?: PaginationResult<T>;
  error?: string | string[];
  message?: string;
};
