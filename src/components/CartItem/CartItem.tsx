import React, { FC, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

import s from './styles.module.scss';

import { doughTypes } from '../../utils/consts';
import { ICartItem } from '../../interfaces';

interface Props {
   cartItem: ICartItem;
   onUpdateCartItemQty: (cartItem: ICartItem) => Promise<void>;
   onRemoveFromCart: (id: number) => Promise<void>;
}

const CartItem: FC<Props> = React.memo(({ cartItem, onUpdateCartItemQty, onRemoveFromCart }) => {
   const { id, imageUrl, title, type, size, price, count } = cartItem;

   const [disableMinusBtn, setDisableMinusBtn] = useState(false);
   const [disablePlusBtn, setDisablePlusBtn] = useState(false);
   const [disableRemoveBtn, setDisableRemoveBtn] = useState(false);

   const totalItemPrice = count * price;

   const handleUpdateQty = async (qty: number, disableBtn: (disable: boolean) => void) => {
      disableBtn(true);
      const newCartItem = { ...cartItem, count: qty };
      await onUpdateCartItemQty(newCartItem);
      disableBtn(false);
   };

   const handlePlusClick = () => {
      handleUpdateQty(count + 1, setDisablePlusBtn);
   };

   const handleMinusClick = () => {
      handleUpdateQty(count - 1, setDisableMinusBtn);
   };

   const removeFromCart = async () => {
      setDisableRemoveBtn(true);
      await onRemoveFromCart(id);
      setDisableRemoveBtn(false);
   };

   return (
      <div className={s.cartItem}>
         <div className={s.itemCard}>
            <div className={s.itemCardImage}>
               <img src={imageUrl} alt={title} />
            </div>
            <div className={s.itemCardInfo}>
               <h4>{title}</h4>
               <p>{doughTypes[type]}, {size} см.</p>
            </div>
         </div>
         <div className={s.controls}>
            <div className={s.actions}>
               <button
                  disabled={disableMinusBtn || count < 2}
                  onClick={handleMinusClick}
               >
                  <FiMinus />
               </button>
               <span>{count}</span>
               <button
                  disabled={disablePlusBtn}
                  onClick={handlePlusClick}
               >
                  <FiPlus />
               </button>
            </div>
            <div className={s.price}>
               {totalItemPrice} ₽
            </div>
            <button
               className={s.removeItemBtn}
               disabled={disableRemoveBtn}
               onClick={removeFromCart}
            >
               <FiPlus />
            </button>
         </div>
      </div>
   );
});

export default CartItem;