import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import s from './styles.module.scss';

import { useClearCart, useFetchCartItems } from '../../hooks';

import { Container, Page, OrderForm } from '../../components';

const Order = () => {
   const { data: cartItems = [] } = useFetchCartItems();
   const { mutateAsync: clearCart } = useClearCart();

   const navigate = useNavigate();

   const handleCartClear = useCallback(async () => {
      await clearCart();
   }, []);

   return (
      <Page>
         <Container customStyle={s.container}>
            <h1 className={s.pageTitle}>Оформление заказа</h1>
            <div className={s.body}>
               <OrderForm
                  cartItems={cartItems}
                  onSubmit={handleCartClear} />
            </div>
            <button
               className={s.btn}
               onClick={() => navigate(-1)}
            >
               <MdOutlineArrowBackIosNew />
               Вернуться назад
            </button>
         </Container>
      </Page>
   );
};

export default Order;