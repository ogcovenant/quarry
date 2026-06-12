import type { PaginationQueryDto } from '../dto/pagination-query.dto';
import type { PaginatedResponse } from '../interfaces/paginated-response.interface';

export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  query: PaginationQueryDto,
): PaginatedResponse<T> {
  const { page, limit } = query;
  const totalPages = Math.ceil(total / limit);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}
