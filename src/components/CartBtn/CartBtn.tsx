import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { MdCurrencyRuble } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';

import s from './styles.module.scss';

import routeNames from '../Router/routeNames';

interface Props {
   totalPrice: number;
   cartQty: number;
}

const CartBtn: FC<Props> = React.memo(({ totalPrice, cartQty }) => {
   return (
      <Link
         to={routeNames.CART}
         className={s.cartBtn}
      >
         <span className={s.cartBtnPrice}>
            {totalPrice}
            <MdCurrencyRuble />
         </span>
         <span className={s.cartBtnLine}></span>
         <span className={s.cartBtnQty}>
            <FiShoppingCart />
            {cartQty}
         </span>
      </Link>
   );
});

export default CartBtn;