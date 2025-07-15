import { SQL, count, asc, desc } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { database } from '@/config/database';
import { PaginationParams, PaginationResult } from '@/types/Pagination';
import { processPaginationParams, calculateOffset, buildPaginationResult } from '@/utils/pagination';

export abstract class BaseRepository<T extends PgTable> {
  protected table: T;

  constructor(table: T) {
    this.table = table;
  }

  /**
   * 通用分页查询方法
   */
  async findWithPagination(
    params: PaginationParams,
    whereCondition?: SQL,
    selectFields?: any
  ): Promise<PaginationResult<any>> {
    const { page, limit, sortBy, sortOrder } = processPaginationParams(params);
    const offset = calculateOffset(page, limit);

    // 构建查询
    let query = database.select(selectFields).from(this.table);
    
    // 添加where条件
    if (whereCondition) {
      query = query.where(whereCondition);
    }

    // 添加排序
    if (sortBy && this.table[sortBy as keyof T]) {
      const sortColumn = this.table[sortBy as keyof T];
      query = query.orderBy(
        sortOrder === 'asc' ? asc(sortColumn) : desc(sortColumn)
      );
    }

    // 添加分页
    query = query.limit(limit).offset(offset);

    // 执行查询
    const data = await query;

    // 获取总数
    let countQuery = database.select({ count: count() }).from(this.table);
    if (whereCondition) {
      countQuery = countQuery.where(whereCondition);
    }
    const [{ count: totalItems }] = await countQuery;

    return buildPaginationResult(data, totalItems, page, limit);
  }

  /**
   * 简化的分页查询（使用默认字段）
   */
  async findAllWithPagination(
    params: PaginationParams,
    whereCondition?: SQL
  ): Promise<PaginationResult<any>> {
    return this.findWithPagination(params, whereCondition);
  }
}
 