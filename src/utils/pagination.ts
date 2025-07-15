import { PaginationParams, PaginationResult, PaginationOptions } from '@/types/Pagination';

/**
 * 处理分页参数，设置默认值和验证
 */
export function processPaginationParams(
  params: PaginationParams,
  options: PaginationOptions = {}
): Required<Pick<PaginationParams, 'page' | 'limit'>> & Pick<PaginationParams, 'sortBy' | 'sortOrder'> {
  const {
    defaultLimit = 10,
    maxLimit = 100
  } = options;

  const page = Math.max(1, params.page || 1);
  const limit = Math.min(maxLimit, Math.max(1, params.limit || defaultLimit));
  
  return {
    page,
    limit,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder || 'desc'
  };
}

/**
 * 计算分页偏移量
 */
export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * 构建分页响应数据
 */
export function buildPaginationResult<T>(
  data: T[],
  totalItems: number,
  page: number,
  limit: number
): PaginationResult<T> {
  const totalPages = Math.ceil(totalItems / limit);
  
  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

/**
 * 从查询参数中提取分页参数
 */
export function extractPaginationFromQuery(query: Record<string, string | undefined>): PaginationParams {
  return {
    page: query.page ? parseInt(query.page, 10) : undefined,
    limit: query.limit ? parseInt(query.limit, 10) : undefined,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder as 'asc' | 'desc' | undefined
  };
}