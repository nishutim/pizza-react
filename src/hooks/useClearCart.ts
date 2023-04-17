import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService from '../services/cartService'
import { ICartItem } from '../interfaces';
import { invokeToast } from '../utils';

const useClearCart = () => {
   const client = useQueryClient();
   return useMutation({
      mutationFn: CartService.clearCart,
      onSuccess: () => {
         client.setQueriesData<ICartItem[]>(['cartItems'], (items) => []);
         client.invalidateQueries({
            queryKey: ['cartItems'],
            refetchType: 'none'
         });
      },
      onError: () => {
         invokeToast('😢 Не удалось очистить корзину', 'error');
      }
   });
};

export default useClearCart;