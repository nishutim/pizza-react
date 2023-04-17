import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './styles.module.scss';
import Image from '../../assets/img/png/cartEmpty.png';

const CartEmptyFallback: FC = React.memo(() => {
   const navigate = useNavigate();

   return (
      <div className={s.root}>
         <h1>Корзина пустая 😢</h1>
         <p>
            Вероятней всего, вы не заказывали ещё пиццу.
            Для того, чтобы заказать пиццу, перейди на главную страницу.
         </p>
         <div className={s.image}>
            <img src={Image} alt="Cart Empty" />
         </div>
         <button onClick={() => navigate(-1)}>
            Вернуться назад
         </button>
      </div>
   );
});

export default CartEmptyFallback;