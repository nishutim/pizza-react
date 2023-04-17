import { CategoryValues, SortTypes, SortValues } from '../utils/types';

interface IProductsQueryParams {
   page: string;
   limit: string;
   search?: string;
   category?: CategoryValues;
   sortBy: SortTypes;
   order: SortValues;
}

export default IProductsQueryParams;