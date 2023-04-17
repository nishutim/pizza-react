import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import s from './styles.module.scss';

import { getCartQty, getCartTotal, normalizeCategory, normalizeSearch, normalizeSort } from '../../utils';
import { useIntersect } from '../../hooks';
import { ICartItem, ICategory, ISortType } from '../../interfaces';

import { CartBtn, Container, HeaderLogo, Search, SearchMobile } from '..';

interface Props {
   cartItems: ICartItem[];
}

const Header: FC<Props> = ({ cartItems }) => {
   const totalPrice = useMemo(() => getCartTotal(cartItems), [cartItems]);
   const cartQty = useMemo(() => getCartQty(cartItems), [cartItems]);

   const [visible, wrapperRef] = useIntersect(true);

   const { search } = useLocation();
   const navigate = useNavigate();

   const searchValue = normalizeSearch(search);
   const selectedCategory = normalizeCategory(search) as ICategory;
   const selectedSort = normalizeSort(search) as ISortType;

   const handleSearchChange = useMemo(() => debounce((value: string) => {
      const query = normalizeSearch(search, value);
      navigate(query);
   }, 500), [selectedCategory, selectedSort]);

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