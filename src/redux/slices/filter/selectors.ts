import { RootState } from '../..';

export const filter_selectFilter = (state: RootState) => state.filter;
export const filter_selectPage = (state: RootState) => state.filter.page;
export const filter_selectLimit = (state: RootState) => state.filter.limit;
export const filter_selectSortType = (state: RootState) => state.filter.sortType;
export const filter_selectCategory = (state: RootState) => state.filter.category;
export const filter_selectSearch = (state: RootState) => state.filter.search;