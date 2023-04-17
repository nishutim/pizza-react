import qs from 'qs';
import { ICategory, IProductsQueryParams, ISortType } from '../interfaces';
import { CategoryValues, SortTypes, SortValues } from './types';
import { categories, sortTypes } from './consts';


const getPageDefaultParams = (pageName?: string) => {
   switch (pageName) {
      default: {
         return {
            page: '1',
            limit: '10',
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