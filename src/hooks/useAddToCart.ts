import { useMutation, useQueryClient } from '@tanstack/react-query';
import CartService from '../services/cartService';
import { ICartItem } from '../interfaces';
import { invokeToast } from '../utils';

const useAddToCart = () => {
   const client = useQueryClient();
   return useMutation({
      mutationFn: CartService.addItemToCart,
      onSuccess: (newItem) => {
         client.setQueriesData<ICartItem[]>(['cartItems'], (items) => [...(items || []), newItem]);
         client.invalidateQueries({
            queryKey: ['cartItems'],
            refetchType: 'none'
         });
      },
      onError: () => {
         invokeToast('😢 Не удалось добавить товар в корзину', 'error');
      }
   });
};

export default useAddToCart;