import qs from 'qs';
import { ICategory, IProductsQueryParams, ISortType } from '../interfaces';
import { CategoryValues, SortTypes, SortValues } from './types';
import { categories, sortTypes } from './consts';
import { FilterState } from '../redux/slices/filter';


const getPageDefaultParams = (pageName?: string) => {
   switch (pageName) {
      default: {
         return {
            page: '1',
            limit: '8',
            sortBy: SortTypes.PRICE,
            order: SortValues.DESC
         } as IProductsQueryParams
      }
   }
}

export const normalizeQuery = (query: string, pageName?: string) => {
   const defaultParams = getPageDefaultParams(pageName);
   const params = qs.parse(query.slice(1));
   return qs.stringify({ ...defaultParams, ...params }, { addQueryPrefix: true });
}

export const mapQueryToFilter = (query: string) => {
   const params = qs.parse(query.slice(1)) as unknown as IProductsQueryParams;
   const filter = {} as FilterState;
   filter.page = +params.page || 1;
   filter.limit = +params.limit || 10;
   filter.sortType = sortTypes.find(item => item.type === params.sortBy && item.value === params.order) || sortTypes[0];
   filter.category = categories.find(item => item.value === params.category) || categories[0];
   filter.search = params.search || '';
   return filter;
}

export const mapFilterToQuery = (filter: FilterState) => {
   const params = {} as IProductsQueryParams;
   params.page = String(filter.page);
   params.limit = String(filter.limit);
   params.sortBy = filter.sortType.type;
   params.order = filter.sortType.value;
   filter.category.value !== CategoryValues.ALL && (params.category = filter.category.value);
   filter.search !== '' && (params.search = filter.search);
   return qs.stringify(params, { addQueryPrefix: true });
}

export const normalizeCategory = (query: string, category?: ICategory) => {
   const normalizedQuery = normalizeQuery(query)
   const params = qs.parse(normalizedQuery.slice(1)) as unknown as IProductsQueryParams;

   if (!category) {
      const defaultCategory = categories[0];
      return params.category ? categories.find(category => category.value === +params.category!)! : defaultCategory;
   } else {
      category.value !== CategoryValues.ALL ? (params.category = category.value) : delete params.category;
      return qs.stringify(params, { addQueryPrefix: true });
   }
}

export const normalizeSort = (query: string, sort?: ISortType) => {
   const normalizedQuery = normalizeQuery(query)
   const params = qs.parse(normalizedQuery.slice(1)) as unknown as IProductsQueryParams;

   if (!sort) {
      return sortTypes.find(sort => sort.type === params.sortBy && sort.value === params.order)!;
   } else {
      params.sortBy = sort.type;
      params.order = sort.value;
      return qs.stringify(params, { addQueryPrefix: true });
   }
}

export const normalizePage = (query: string, page?: number) => {
   const normalizedQuery = normalizeQuery(query)
   const params = qs.parse(normalizedQuery.slice(1)) as unknown as IProductsQueryParams;

   if (!page) {
      return params.page;
   } else {
      params.page = String(page);
      return qs.stringify(params, { addQueryPrefix: true });
   }
}

export const normalizeSearch = (query: string, searchValue?: string) => {
   const normalizedQuery = normalizeQuery(query)
   const params = qs.parse(normalizedQuery.slice(1)) as unknown as IProductsQueryParams;

   if (searchValue === undefined) {
      return params.search || '';
   } else {
      searchValue ? (params.search = searchValue) : delete params.search;
      return qs.stringify(params, { addQueryPrefix: true });
   }
}