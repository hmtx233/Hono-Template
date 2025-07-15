// 分页请求参数
export interface PaginationParams {
  page?: number;        // 页码，从1开始
  limit?: number;       // 每页数量
  sortBy?: string;      // 排序字段
  sortOrder?: 'asc' | 'desc'; // 排序方向
}

// 分页响应数据
export interface PaginationResult<T> {
  data: T[];           // 当前页数据
  pagination: {
    currentPage: number;   // 当前页码
    totalPages: number;    // 总页数
    totalItems: number;    // 总记录数
    itemsPerPage: number;  // 每页记录数
    hasNextPage: boolean;  // 是否有下一页
    hasPrevPage: boolean;  // 是否有上一页
  };
}

// 分页查询选项
export interface PaginationOptions {
  defaultLimit?: number;  // 默认每页数量
  maxLimit?: number;      // 最大每页数量
}