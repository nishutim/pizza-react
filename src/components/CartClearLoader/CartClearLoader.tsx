import React, { FC } from 'react';

import s from './styles.module.scss';

interface Props {
   show: boolean;
}

const CartClearLoader: FC<Props> = React.memo(({ show }) => {
   return (
      <div className={`${s.cartClearLoader} ${show ? s.cartClearLoaderActive : ''}`}>
         <span>Подождите чуть-чуть, сейчас очистим корзину 💖</span>
      </div>
   );
});

export default CartClearLoader;