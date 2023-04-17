import { ICategory, ISortType } from '.';

interface IFilter {
   page: number;
   limit: number;
   search: string;
   category: ICategory;
   sort: ISortType;
}

export default IFilter;