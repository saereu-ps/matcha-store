export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface QueryFilter {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains' | 'startsWith';
  value: unknown;
}

export interface QueryOptions {
  filters?: QueryFilter[];
  sort?: { field: string; direction: 'asc' | 'desc' }[];
  page?: number;
  pageSize?: number;
}

export interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findMany(options?: QueryOptions): Promise<PagedResult<T>>;
  save(entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
  exists(id: ID): Promise<boolean>;
}
