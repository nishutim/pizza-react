import { FC, useMemo } from 'react';
import debounce from 'lodash.debounce';

import s from './styles.module.scss';

import { getCartQty, getCartTotal } from '../../utils';
import { useAppDispatch, useAppSelector, useFetchCartItems, useIntersect } from '../../hooks';
import { filter_selectSearch } from '../../redux/slices/filter/selectors';
import { setSearch } from '../../redux/slices/filter';

import { CartBtn, Container, HeaderLogo, Search, SearchMobile } from '..';

const Header: FC = () => {
   const searchValue = useAppSelector(filter_selectSearch);
   const { data: cartItems = [] } = useFetchCartItems();
   const totalPrice = useMemo(() => getCartTotal(cartItems), [cartItems]);
   const cartQty = useMemo(() => getCartQty(cartItems), [cartItems]);

   const [visible, wrapperRef] = useIntersect(true);

   const dispatch = useAppDispatch();

   const handleSearchChange = useMemo(() => debounce((value: string) => {
      dispatch(setSearch(value));
   }, 500), []);

   return (
      <header
         ref={wrapperRef}
         className={`${s.header} ${!visible ? s.scrolled : ''}`}
      >
         <div className={s.wrapper}>
            <Container>
               <div className={s.body}>
                  <HeaderLogo />
                  <Search
                     searchValue={searchValue}
                     onChange={handleSearchChange} />
                  <SearchMobile
                     searchValue={searchValue}
                     onChange={handleSearchChange} />
                  <CartBtn
                     totalPrice={totalPrice}
                     cartQty={cartQty} />
               </div>
            </Container>
         </div>
      </header>
   );
};

export default Header;