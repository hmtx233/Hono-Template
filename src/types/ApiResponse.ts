export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string | string[];
  message?: string;
};
