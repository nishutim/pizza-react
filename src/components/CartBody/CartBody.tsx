import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import s from './styles.module.scss';

import { ICartItem } from '../../interfaces';
import RouteNames from '../Router/routeNames';
import { getCartQty, getCartTotal } from '../../utils';

import { CartItem } from '..';

interface Props {
   cartItems: ICartItem[];
   onUpdateCartItemQty: (cartItem: ICartItem) => Promise<void>;
   onRemoveFromCart: (id: number) => Promise<void>;
   onClearCart: () => Promise<void>;
}

const CartBody: FC<Props> = React.memo(({ cartItems, onUpdateCartItemQty, onRemoveFromCart, onClearCart }) => {
   const [disableClearCartBtn, setDisableClearCartBtn] = useState(false);

   const cartQty = getCartQty(cartItems);
   const cartTotal = getCartTotal(cartItems);

   const navigate = useNavigate();

   const handleClearCart = async () => {
      setDisableClearCartBtn(true);
      await onClearCart();
      setDisableClearCartBtn(false);
   }

   return (
      <div className={s.cartBody}>
         <div className={s.header}>
            <h1>
               <FiShoppingCart />
               Корзина
            </h1>
            <button
               disabled={disableClearCartBtn}
               onClick={handleClearCart}
            >
               <RiDeleteBin6Line size='20px' />
               <span>
                  Очистить корзину
               </span>
            </button>
         </div>
         <div className={s.cartList}>
            {cartItems.map(item => (
               <CartItem
                  key={item.id}
                  cartItem={item}
                  onUpdateCartItemQty={onUpdateCartItemQty}
                  onRemoveFromCart={onRemoveFromCart} />
            ))}
         </div>
         <div className={s.info}>
            <div className={s.infoQty}>
               <span>Всего пицц:</span>
               <b>{cartQty} шт.</b>
            </div>
            <div className={s.infoPrice}>
               <span>Сумма заказа:</span>
               <b>{cartTotal} ₽</b>
            </div>
         </div>
         <div className={s.footer}>
            <button
               className={s.btn}
               onClick={() => navigate(-1)}
            >
               <MdOutlineArrowBackIosNew />
               Вернуться назад
            </button>
            <Link
               className={`${s.btn} ${s.btnOrder}`}
               to={RouteNames.ORDER}
            >
               Оформить заказ
            </Link>
         </div>
      </div>
   );
});

export default CartBody;