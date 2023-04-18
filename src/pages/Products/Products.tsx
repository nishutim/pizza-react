import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import s from './styles.module.scss';

import { useAddToCart, useAppDispatch, useAppSelector, useFetchCartItems, useFetchProducts, useUpdateItemInCart } from '../../hooks';
import { ICartItem, ICategory, ISortType } from '../../interfaces';
import { filter_selectCategory, filter_selectFilter, filter_selectPage, filter_selectSearch, filter_selectSortType } from '../../redux/slices/filter/selectors';
import { CategoryValues } from '../../utils/types';
import { setCategory, setFilter, setPage, setSortType } from '../../redux/slices/filter';
import { mapFilterToQuery, mapQueryToFilter, normalizeQuery } from '../../utils';

import {
   Categories,
   Container,
   Page,
   Sorting,
   Pagination,
   ProductsList
} from '../../components';

const Products: FC = () => {
   const { search } = useLocation();
   const query = normalizeQuery(search);

   const { data: products = [], isLoading } = useFetchProducts(query);
   const { data: cartItems = [] } = useFetchCartItems();
   const { mutateAsync: addToCart } = useAddToCart();
   const { mutateAsync: updateItemInCart } = useUpdateItemInCart();

   const filter = useAppSelector(filter_selectFilter);
   const selectedPage = useAppSelector(filter_selectPage);
   const selectedSort = useAppSelector(filter_selectSortType);
   const selectedCategory = useAppSelector(filter_selectCategory);
   const searchValue = useAppSelector(filter_selectSearch);

   const shouldPaginationReset = useMemo(() => (
      [searchValue, selectedCategory, selectedSort]
   ), [searchValue, selectedCategory, selectedSort]);

   const shouldUpdateQuery = useRef(false);

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const handleCategoryChange = useCallback((category: ICategory) => {
      dispatch(setCategory(category));
   }, []);

   const handleSortChange = useCallback((sort: ISortType) => {
      dispatch(setSortType(sort));
   }, []);

   const handlePageChange = useCallback((page: number) => {
      dispatch(setPage(page));
   }, []);

   const handleAddToCart = useCallback(async (newCartItem: ICartItem) => {
      const itemInCart = cartItems.find(item => (
         item.title === newCartItem.title && item.type === newCartItem.type && item.size === newCartItem.size
      ));

      if (!itemInCart) {
         await addToCart({ ...newCartItem, id: cartItems.length });
      } else {
         await updateItemInCart({ ...itemInCart, count: itemInCart.count + newCartItem.count });
      }
   }, [cartItems]);

   useEffect(() => {
      navigate(query);
      const currentFilter = mapQueryToFilter(search);
      dispatch(setFilter(currentFilter));
   }, []);

   useEffect(() => {
      if (shouldUpdateQuery.current) {
         const query = mapFilterToQuery(filter);
         navigate(query);
      } else {
         shouldUpdateQuery.current = true;
      }
   }, [filter]);

   return (
      <Page>
         <Container customStyle={s.container}>
            <div className={s.filter}>
               <Categories
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange} />
               <Sorting
                  selectedSort={selectedSort}
                  onSortChange={handleSortChange} />
            </div>
            <h1 className={s.pageTitle}>
               {selectedCategory.value !== CategoryValues.ALL ? selectedCategory.name : 'Все пиццы'}
            </h1>
            <ProductsList
               isLoading={isLoading}
               products={products}
               cartItems={cartItems}
               onAddToCart={handleAddToCart} />
            {products.length > 0 && (
               <Pagination
                  customStyle={s.pagination}
                  selectedPage={selectedPage}
                  totalCount={selectedCategory.value === CategoryValues.ALL && !searchValue ? 10 : products.length}
                  onPageChange={handlePageChange}
                  deps={shouldPaginationReset} />
            )}
         </Container>
      </Page>
   );
};

export default Products;