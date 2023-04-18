import { ICategory, ISortType } from '../interfaces';
import { CategoryNames, CategoryValues, DoughTypes, PizzaSizes, SortNames, SortTypes, SortValues } from './types';

export const categories: ICategory[] = [
   {
      name: CategoryNames.ALL,
      value: CategoryValues.ALL
   },
   {
      name: CategoryNames.MEAT,
      value: CategoryValues.MEAT
   },
   {
      name: CategoryNames.VEGGIE,
      value: CategoryValues.VEGGIE
   },
   {
      name: CategoryNames.GRILL,
      value: CategoryValues.GRILL
   },
   {
      name: CategoryNames.SPICEY,
      value: CategoryValues.SPICEY
   },
   {
      name: CategoryNames.CLOSED,
      value: CategoryValues.CLOSED
   }
];

export const sortTypes: ISortType[] = [
   {
      name: SortNames.BY_PRICE_DESC,
      type: SortTypes.PRICE,
      value: SortValues.DESC
   },
   {
      name: SortNames.BY_PRICE_ASC,
      type: SortTypes.PRICE,
      value: SortValues.ASC
   },
   {
      name: SortNames.BY_RATING_DESC,
      type: SortTypes.RATING,
      value: SortValues.DESC
   },
   {
      name: SortNames.BY_RATING_ASC,
      type: SortTypes.RATING,
      value: SortValues.ASC
   },
   {
      name: SortNames.BY_ALPHABET_DESC,
      type: SortTypes.ALPHABET,
      value: SortValues.DESC
   },
   {
      name: SortNames.BY_ALPHABET_ASC,
      type: SortTypes.ALPHABET,
      value: SortValues.ASC
   }
];
export const doughTypes: DoughTypes[] = [DoughTypes.CLASSIC, DoughTypes.TRADITIONAL];
export const pizzaSizes: PizzaSizes[] = [PizzaSizes.S, PizzaSizes.M, PizzaSizes.L];