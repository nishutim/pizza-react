import { FC, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import s from './styles.module.scss';

import { useAddToCart, useFetchCartItems, useFetchProducts, useUpdateItemInCart } from '../../hooks';
import { ICartItem, ICategory, ISortType } from '../../interfaces';
import { CategoryValues } from '../../utils/types';
import {
   normalizeCategory,
   normalizePage,
   normalizeQuery,
   normalizeSearch,
   normalizeSort
} from '../../utils';

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
   const navigate = useNavigate();

   const query = normalizeQuery(search);

   const { data: products = [], isLoading } = useFetchProducts(query);
   const { data: cartItems = [] } = useFetchCartItems();
   const { mutateAsync: addToCart } = useAddToCart();
   const { mutateAsync: updateItemInCart } = useUpdateItemInCart();

   const searchValue = normalizeSearch(search);
   const selectedCategory = normalizeCategory(search) as ICategory;
   const selectedSort = normalizeSort(search) as ISortType;
   const selectedPage = normalizePage(search);

   const handleCategoryChange = (category: ICategory) => {
      const query = normalizeCategory(search, category) as string;
      navigate(query);
   };

   const handleSortChange = (sort: ISortType) => {
      const query = normalizeSort(search, sort) as string;
      navigate(query);
   };

   const handlePageChange = (page: number) => {
      const query = normalizePage(search, page);
      navigate(query);
   };

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

   useEffect(() => navigate(query), []);

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
                  selectedPage={+selectedPage}
                  totalCount={selectedCategory.value === CategoryValues.ALL && !searchValue ? 10 : products.length}
                  onPageChange={handlePageChange} />
            )}
         </Container>
      </Page>
   );
};

export default Products;