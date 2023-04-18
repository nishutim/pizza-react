import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CategoryNames, CategoryValues, SortNames, SortTypes, SortValues } from '../../../utils/types';
import { ICategory, ISortType } from '../../../interfaces';

export interface FilterState {
   page: number;
   limit: number;
   sortType: ISortType;
   category: ICategory;
   search: string;
}

const initialState: FilterState = {
   page: 1,
   limit: 8,
   sortType: {
      name: SortNames.BY_PRICE_DESC,
      type: SortTypes.PRICE,
      value: SortValues.DESC
   },
   category: {
      name: CategoryNames.ALL,
      value: CategoryValues.ALL
   },
   search: ''
};

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload;
      },
      setSortType: (state, action: PayloadAction<ISortType>) => {
         state.sortType = action.payload;
      },
      setCategory: (state, action: PayloadAction<ICategory>) => {
         state.category = action.payload;
      },
      setSearch: (state, action: PayloadAction<string>) => {
         state.search = action.payload;
      },
      setFilter: (state, action: PayloadAction<FilterState>) => {
         state = { ...action.payload };
      }
   }
});

export const { setPage, setSortType, setCategory, setSearch, setFilter } = filterSlice.actions;
export default filterSlice.reducer;