import type { IPaginationSort } from './pagination.interface';

export abstract class PaginationListAbstract {
  abstract search?: string;

  abstract availableSearch: string[];

  abstract page: number;

  abstract perPage: number;

  abstract sort: IPaginationSort;

  abstract availableSort: string[];
}
