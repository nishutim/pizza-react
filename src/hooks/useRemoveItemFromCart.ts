import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService from '../services/cartService'
import { ICartItem } from '../interfaces';
import { invokeToast } from '../utils';

const useRemoveItemFromCart = () => {
   const client = useQueryClient();
   return useMutation({
      mutationFn: CartService.removeItemFromCart,
      onSuccess: (_, id) => {
         client.setQueriesData<ICartItem[]>(['cartItems'], (items) => items?.filter(item => item.id !== id));
         client.invalidateQueries({
            queryKey: ['cartItems'],
            refetchType: 'none'
         });
      },
      onError: () => {
         invokeToast('😢 Не удалось удалить товар из корзины', 'error');
      }
   });
};

export default useRemoveItemFromCart;