import { FC, useCallback, useState } from 'react';

import s from './styles.module.scss';

import { useClearCart, useFetchCartItems, useRemoveItemFromCart, useUpdateItemInCart } from '../../hooks';
import { ICartItem } from '../../interfaces';

import {
   Page,
   Preloader,
   CartEmptyFallback,
   Container,
   CartClearLoader,
   CartBody
} from '../../components';

const Cart: FC = () => {
   const { data: cartItems = [], isLoading } = useFetchCartItems();
   const { mutateAsync: updateItemInCart } = useUpdateItemInCart();
   const { mutateAsync: removeItemFromCart } = useRemoveItemFromCart();
   const { mutateAsync: clearCart } = useClearCart();

   const [showCartClearLoader, setShowCartClearLoader] = useState(false);

   const handleUpdateCartItemQty = useCallback(async (cartItem: ICartItem) => {
      await updateItemInCart(cartItem);
   }, []);

   const handleCartItemRemove = useCallback(async (id: number) => {
      await removeItemFromCart(id);
   }, []);

   const handleCartClear = useCallback(async () => {
      setShowCartClearLoader(true);
      await clearCart();
      setShowCartClearLoader(false);
   }, []);

   return (
      <Page>
         <Container customStyle={`${s.container} ${!cartItems.length || isLoading ? s.cartEmpty : ''}`}>
            {isLoading
               ? <Preloader />
               : !cartItems.length
                  ? <CartEmptyFallback />
                  : <CartBody
                     cartItems={cartItems}
                     onClearCart={handleCartClear}
                     onUpdateCartItemQty={handleUpdateCartItemQty}
                     onRemoveFromCart={handleCartItemRemove} />
            }
            <CartClearLoader show={showCartClearLoader} />
         </Container>
      </Page>
   );
};

export default Cart;